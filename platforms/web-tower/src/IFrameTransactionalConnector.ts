import { ICoreLocalApiRequest, ILocalAPIRequest, ILocalAPIResponse, IObservableLocalAPIRequest, IObservableLocalAPIResponse, ObservableOperation, SubscriptionOperation } from '@airport/aviation-communication';
import {
	IContext,
	IInjected,
	Inject,
	Injected
} from '@airport/direction-indicator'

import {
	DbApplicationVersion,
	DbDomain,
	DbDomain_Name,
	IAirEntity,
	IDbApplicationUtils,
	ISaveResult,
	ITransactionalConnector,
	PortableQuery
} from '@airport/ground-control';
import {
	IEntityContext
} from '@airport/tarmaq-entity';
import {
	IQueryContext
} from '@airport/tarmaq-query';
import { AppState, IAddRepositoryIMI, IApplicationLoader, ICallApiIMI, IGetLatestApplicationVersionByDbApplication_NameIMI, IInitConnectionIMI, IInitConnectionIMO, IIsolateMessage, IIsolateMessageOut, ILocalAPIServer, IObservableMessageInRecord, IPortableQueryIMI, IReadQueryIMI, IRetrieveDomainIMI, ISaveIMI, IsolateMessageType, ITerminalStore } from '@airport/terminal-map';
import { IApplicationStore } from '@airport/tower';
import {
	Observable,
	Observer,
	Subscription
} from 'rxjs';
import { v4 as guidv4 } from "uuid";

export interface IIframeTransactionalConnector
	extends ITransactionalConnector {

	getLatestApplicationVersionMapByDbApplication_FullName(
		applicationName: string
	): Promise<DbApplicationVersion>

	initializeConnection(): Promise<void>

	processMessage(
		message: IIsolateMessageOut<any> | ILocalAPIRequest,
		origin: string
	): Promise<void>

	retrieveDomain(
		domainName: DbDomain_Name
	): Promise<DbDomain>

}

@Injected()
export class IframeTransactionalConnector
	implements IIframeTransactionalConnector {

	@Inject()
	applicationLoader: IApplicationLoader

	@Inject()
	applicationStore: IApplicationStore

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	localApiServer: ILocalAPIServer

	@Inject()
	terminalStore: ITerminalStore

	internal = false

	clientSubscriptionMap: Map<string, Subscription> = new Map()

	async processMessage(
		message: IIsolateMessageOut<any> | ILocalAPIRequest,
		origin: string
	): Promise<void> {
		if (message.__received__) {
			return
		}
		message.__received__ = true
		// Filter out any browser plugin messages
		if (!message.domain || !message.application) {
			return
		}
		if (this.applicationStore.state.messageCallback) {
			const receivedDate = new Date()
			message.__receivedTime__ = receivedDate.getTime()
			this.applicationStore.state.messageCallback(message)
		}
		if (message.domain.indexOf('.') > -1) {
			// Invalid Domain name - cannot have periods that would point to invalid subdomains
			return
		}
		if (message.application.indexOf('.') > -1) {
			// Invalid Application name - cannot have periods that would point to invalid subdomains
			return
		}
		const mainDomain = origin.split('//')[1]
		const mainDomainFragments = mainDomain.split('.')
		let startsWithWww = false
		if (mainDomainFragments[0] === 'www') {
			mainDomainFragments.splice(0, 1)
			startsWithWww = true
		}
		const domainSuffix = '.' + mainDomainFragments.join('.')
		const ownDomain = window.location.hostname
		if (ownDomain !== 'localhost') {
			// Only accept requests from https protocol
			if (!origin.startsWith("https")
				// And only if message has Domain and Application names 
				|| !message.domain
				|| !message.application
				// And if own domain is a direct sub-domain of the message's domain
				|| ownDomain !== this.dbApplicationUtils.
					getDbApplication_FullName({
						domain: message.domain,
						name: message.application,
					}) + domainSuffix) {
				return
			}
			const ownDomainFragments = ownDomain.split('.')
			// Only accept requests from 'www.${mainDomain_Name}' or 'www.${mainDomain_Name}'
			// All 'App' messages must first come from the main domain, which ensures
			// that the application is installed
			const expectedNumFragments = mainDomainFragments.length + (startsWithWww ? 0 : 1)
			if (ownDomainFragments.length !== expectedNumFragments) {
				return
			}
		}
		switch (message.category) {
			case 'FromClientRedirected':
				await this.handleLocalApiRequest(message as ILocalAPIRequest, origin)
				return
			case 'FromDb':
				if (message.type === IsolateMessageType.APP_INITIALIZING) {
					if (this.applicationStore.state.appState === AppState.NOT_INITIALIZED
						&& message.result) {
						// console.log(`--==<<(( path: ${window.location.pathname} appState: ${this.applicationStore.state.appState}, domain: ${message.domain}, app: ${message.application} ))>>==--`)
						// console.log(message.result)
						let initConnectionIMO: IInitConnectionIMO = message
						const lastTerminalState = this.terminalStore.getTerminalState()
						this.terminalStore.state.next({
							...lastTerminalState,
							lastIds: initConnectionIMO.result
						})
						this.applicationStore.state.appState = AppState.START_INITIALIZING
					}
					return
				}
				this.handleDbToIsolateMessage(message as IIsolateMessageOut<any>, mainDomain)
				return
			default:
				return
		}
	}

	async callApi(
		apiInput: ICoreLocalApiRequest
	): Promise<ILocalAPIResponse> {
		return await this.sendMessage<ICallApiIMI, ILocalAPIResponse>({
			...this.getCoreFields(),
			actor: null,
			application: apiInput.application,
			args: apiInput.args,
			domain: apiInput.domain,
			methodName: apiInput.methodName,
			hostDomain: location.host,
			hostProtocol: location.protocol,
			objectName: apiInput.objectName,
			protocol: location.protocol,
			type: IsolateMessageType.CALL_API
		})
	}

	async addRepository(
		// url: string,
		// platform: PlatformType,
		// platformConfig: string,
		// distributionStrategy: DistributionStrategy,
		context: IContext
	): Promise<number> {
		return await this.sendMessage<IAddRepositoryIMI, number>({
			...this.getCoreFields(),
			// distributionStrategy,
			// platform,
			// platformConfig,
			type: IsolateMessageType.ADD_REPOSITORY,
			// url
		})
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		return await this.sendMessage<IReadQueryIMI, EntityArray>({
			...this.getCoreFields(),
			cachedSqlQueryId,
			portableQuery,
			repository: context.repository,
			type: IsolateMessageType.FIND
		})
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext,
		cachedSqlQueryId?: number,
	): Promise<E> {
		return await this.sendMessage<IReadQueryIMI, E>({
			...this.getCoreFields(),
			cachedSqlQueryId,
			portableQuery,
			repository: context.repository,
			type: IsolateMessageType.FIND_ONE
		})
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		return this.sendObservableMessage<E, EntityArray>(
			portableQuery,
			context,
			IsolateMessageType.SEARCH,
			cachedSqlQueryId
		);
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext,
		cachedSqlQueryId?: number,
	): Observable<E> {
		return this.sendObservableMessage<E, E>(
			portableQuery,
			context,
			IsolateMessageType.SEARCH_ONE,
			cachedSqlQueryId
		);
	}

	async save<E extends IAirEntity, T = E | E[]>(
		entity: T,
		context: IEntityContext,
	): Promise<ISaveResult> {
		const dbEntity = context.dbEntity;
		return await this.sendMessage<ISaveIMI<any, any>, ISaveResult>({
			...this.getCoreFields(),
			dbEntity: {
				_localId: dbEntity._localId,
				_applicationVersionLocalId: dbEntity.applicationVersion._localId
			},
			entity,
			type: IsolateMessageType.SAVE
		})
	}

	async saveToDestination<E extends IAirEntity, T = E | E[]>(
		repositoryDestination: string,
		entity: T,
		context?: IContext,
	): Promise<ISaveResult> {
		const dbEntity = context.dbEntity;
		return await this.sendMessage<ISaveIMI<any, any>, ISaveResult>({
			...this.getCoreFields(),
			dbEntity: {
				_localId: dbEntity._localId,
				_applicationVersionLocalId: dbEntity.applicationVersion._localId
			},
			entity,
			repositoryDestination,
			type: IsolateMessageType.SAVE_TO_DESTINATION
		})
	}

	// FIXME: check if ensureGeneratedValues is needed
	async insertValues(
		portableQuery: PortableQuery,
		context: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		return await this.sendMessage<IPortableQueryIMI, number>({
			...this.getCoreFields(),
			portableQuery,
			type: IsolateMessageType.INSERT_VALUES
		})
	}

	async insertValuesGetLocalIds(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number[][]> {
		return await this.sendMessage<IPortableQueryIMI, number[][]>({
			...this.getCoreFields(),
			portableQuery,
			type: IsolateMessageType.INSERT_VALUES_GET_IDS
		})
	}

	async updateValues(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		return await this.sendMessage<IPortableQueryIMI, number>({
			...this.getCoreFields(),
			portableQuery,
			type: IsolateMessageType.UPDATE_VALUES
		})
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		return await this.sendMessage<IPortableQueryIMI, number>({
			...this.getCoreFields(),
			portableQuery,
			type: IsolateMessageType.DELETE_WHERE
		})
	}

	async getLatestApplicationVersionMapByDbApplication_FullName(
		fullDbApplication_Name: string
	): Promise<DbApplicationVersion> {
		return await this.sendMessageNoWait<IGetLatestApplicationVersionByDbApplication_NameIMI, DbApplicationVersion>({
			...this.getCoreFields(),
			fullDbApplication_Name: fullDbApplication_Name,
			type: IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME
		})
	}

	async initializeConnection(): Promise<void> {
		while (this.applicationStore.state.appState === AppState.NOT_INITIALIZED
			|| this.applicationStore.state.appState === AppState.START_INITIALIZING) {
			await this.isConnectionInitialized()
			await this.wait(100)
		}
	}

	private async handleLocalApiRequest(
		request: ILocalAPIRequest,
		origin: string
	) {
		while (this.applicationStore.state.appState !== AppState.INITIALIZED) {
			await this.wait(100)
		}
		const observableRequest = request as IObservableLocalAPIRequest
		const subscriptionId = observableRequest.subscriptionId
		switch (observableRequest.subscriptionOperation) {
			case SubscriptionOperation.OPERATION_SUBSCRIBE: {
				const response = await this.localApiServer.handleRequest(request)
				const subscription = response.payload.subscribe(payload => {
					window.parent.postMessage({
						...response,
						subscriptionId,
						observableOperation: ObservableOperation.OBSERVABLE_DATAFEED,
						payload
					}, origin)
				})
				this.clientSubscriptionMap.set(subscriptionId, subscription)
				window.parent.postMessage({
					...response,
					subscriptionId,
					payload: null,
					observableOperation: ObservableOperation.OBSERVABLE_SUBSCRIBE
				}, origin)
				break
			}
			case SubscriptionOperation.OPERATION_UNSUBSCRIBE: {
				const subscription = this.clientSubscriptionMap.get(subscriptionId)
				if (!subscription) {
					break
				}
				subscription.unsubscribe()
				this.clientSubscriptionMap.delete(subscriptionId)
				// No need to send a message back, no transaction is started
				// for the Unsubscribe operation
				break
			}
			default: {
				const response = await this.localApiServer.handleRequest(request)
				window.parent.postMessage(response, origin)
				break
			}
		}
	}

	private handleDbToIsolateMessage(
		message: IIsolateMessageOut<any>,
		mainDomain: string
	) {
		let observableMessageRecord: IObservableMessageInRecord<any>
		switch (message.type) {
			// case IsolateMessageType.APP_INITIALIZING:
			// 	this.mainDomain = mainDomain
			// 	this.pendingMessageMap.delete(message.id);
			// 	return
			case IsolateMessageType.SEARCH:
			case IsolateMessageType.SEARCH_ONE: {
				observableMessageRecord = this.applicationStore.state.observableDbToIsolateMessageMap.get(message.id)
				if (!observableMessageRecord || !observableMessageRecord.observer) {
					return
				}
				if (message.errorMessage) {
					observableMessageRecord.observer.error(message.errorMessage)
				} else {
					observableMessageRecord.observer.next(message.result)
				}
				return
			}
		}

		const subscriptionId = (message as any as IObservableLocalAPIResponse).subscriptionId
		if (subscriptionId) {
			const apiRequestSubject = this.applicationStore.state.observableApiRequestMap.get(subscriptionId)
			if (!apiRequestSubject) {
				console.error(`Could not find Observable API Request Subject for subscriptionId: ${subscriptionId}`)
				return
			}
			try {
				apiRequestSubject.next(message)
			} catch (e) {
				console.error(e)
				apiRequestSubject.error(e)
			}
			return
		}

		const messageRecord = this.applicationStore.state.pendingMessageMap.get(message.id);
		if (!messageRecord) {
			return
		}

		if (message.errorMessage) {
			messageRecord.reject(message.errorMessage)
		} else if (message.type === IsolateMessageType.CALL_API) {
			messageRecord.resolve(message)
		} else {
			messageRecord.resolve(message.result)
		}
		this.applicationStore.state.pendingMessageMap.delete(message.id)
	}

	private getCoreFields(): {
		application: string,
		category: 'ToDb',
		domain: string,
		id: string,
	} {
		return {
			application: this.applicationStore.state.application,
			category: 'ToDb',
			domain: this.applicationStore.state.domain,
			id: guidv4(),
		}
	}

	private async sendMessage<IMessageIn extends IIsolateMessage, ReturnType>(
		message: IMessageIn
	): Promise<ReturnType> {
		while (!await this.isConnectionInitialized()) {
			await this.wait(100)
		}
		return await this.sendMessageNoWait(message)
	}

	private async sendMessageNoReturn<IMessageIn extends IIsolateMessage>(
		message: IMessageIn
	): Promise<void> {
		while (!await this.isConnectionInitialized()) {
			await this.wait(100)
		}
		message.transactionId = (<IInjected>this).__container__.context.id
		window.parent.postMessage(message, this.applicationStore.state.hostServer)
	}

	private async sendMessageNoWait<IMessageIn extends IIsolateMessage, ReturnType>(
		message: IMessageIn
	): Promise<ReturnType> {
		message.transactionId = (<IInjected>this).__container__.context.id
		window.parent.postMessage(message, this.applicationStore.state.hostServer)
		return new Promise<ReturnType>((resolve, reject) => {
			this.applicationStore.state.pendingMessageMap.set(message.id, {
				message,
				resolve,
				reject
			})
		})
	}

	private sendObservableMessage<E, T>(
		portableQuery: PortableQuery,
		context: IQueryContext,
		type: IsolateMessageType,
		cachedSqlQueryId?: number
	): Observable<T> {
		const coreFields = this.getCoreFields()
		let message = {
			...coreFields,
			cachedSqlQueryId,
			portableQuery,
			repository: context.repository,
			type
		}
		let observableMessageRecord: IObservableMessageInRecord<T> = {
			id: coreFields.id
		}
		this.applicationStore.state.observableDbToIsolateMessageMap.set(coreFields.id, observableMessageRecord)
		const observable = new Observable((observer: Observer<any>) => {
			if (observableMessageRecord.observer) {
				throw new Error(`Multiple Observers assigned via
IFrameTransactionalConnector.sendObservableMessage`)
			}
			observableMessageRecord.observer = observer
			return () => {
				this.sendMessageNoReturn<IIsolateMessage>({
					...coreFields,
					type: IsolateMessageType.SEARCH_UNSUBSCRIBE
				}).then()
				observer.complete()
			};
		});
		window.parent.postMessage(message, this.applicationStore.state.hostServer)

		return observable;
	}

	private wait(
		milliseconds: number
	): Promise<void> {
		return new Promise((resolve, _reject) => {
			setTimeout(() => {
				resolve()
			}, milliseconds)
		})
	}

	private async isConnectionInitialized(): Promise<boolean> {
		switch (this.applicationStore.state.appState) {
			case AppState.NOT_INITIALIZED:
				break;
			case AppState.INITIALIZING_IN_PROGRESS:
				return false
			case AppState.START_INITIALIZING:
				this.applicationStore.state.appState = AppState.INITIALIZING_IN_PROGRESS
				// const lastIds = this.terminalStore.getLastIds()
				// console.log(` path: ${window.location.pathname} INITIALIZING_IN_PROGRESS appIndex: ${lastIds.applications} ))>>==--`)
				await this.applicationLoader.load(this.terminalStore.getLastIds())
				this.applicationStore.state.appState = AppState.INITIALIZED
				await this.applicationLoader.initialize()
				window.parent.postMessage({
					...this.getCoreFields(),
					fullDbApplication_Name: this.dbApplicationUtils.
						getDbApplication_FullName(
							this.applicationLoader.getApplication()),
					type: IsolateMessageType.APP_INITIALIZED
				}, this.applicationStore.state.hostServer)
				return true
			case AppState.INITIALIZED:
				return true
		}

		let jsonApplication = this.applicationLoader.getApplication()
		this.applicationStore.state.domain = jsonApplication.domain
		this.applicationStore.state.application = jsonApplication.name

		let message: IInitConnectionIMI = {
			...this.getCoreFields(),
			jsonApplication,
			type: IsolateMessageType.APP_INITIALIZING
		}

		window.parent.postMessage(message, this.applicationStore.state.hostServer)
		return false
	}

	async retrieveDomain(
		domainName: DbDomain_Name
	): Promise<DbDomain> {
		return await this.sendMessageNoWait<IRetrieveDomainIMI, DbDomain>({
			...this.getCoreFields(),
			domainName,
			type: IsolateMessageType.RETRIEVE_DOMAIN
		})
	}

	onMessage(callback: (
		message: any
	) => void) {
		this.applicationStore.state.messageCallback = callback
	}

}
