import {
	IAddRepositoryIMI,
	IGetLatestApplicationVersionByApplication_NameIMI,
	IInitConnectionIMI,
	IInitConnectionIMO,
	IIsolateMessage,
	IIsolateMessageOut,
	IsolateMessageType,
	IPortableQueryIMI,
	IReadQueryIMI,
	IRetrieveDomainIMI,
	ISaveIMI,
	IApplicationLoader,
	ILocalAPIServer,
	IApplicationStore,
	AppState,
	IObservableMessageInRecord,
	ICallApiIMI
} from '@airport/apron';
import { ICoreLocalApiRequest, ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import {
	IContext,
	IInjected,
	Inject,
	Injected
} from '@airport/direction-indicator'

import {
	DbApplicationVersion,
	DbDomain,
	Domain_Name,
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
import { ITerminalStore } from '@airport/terminal-map';
import {
	Observable,
	Observer
} from 'rxjs';
import { v4 as guidv4 } from "uuid";

export interface IIframeTransactionalConnector
	extends ITransactionalConnector {

	getLatestApplicationVersionMapByApplication_FullName(
		applicationName: string
	): Promise<DbApplicationVersion>

	initializeConnection(): Promise<void>

	processMessage(
		message: IIsolateMessageOut<any> | ILocalAPIRequest,
		origin: string
	): Promise<void>

	retrieveDomain(
		domainName: Domain_Name
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
					getApplication_FullName({
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
				this.applicationStore.state.domain = message.domain
				this.applicationStore.state.application = message.application
				if (message.type === IsolateMessageType.APP_INITIALIZING) {
					if (this.applicationStore.state.appState === AppState.NOT_INITIALIED
						&& message.result) {
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

	async getLatestApplicationVersionMapByApplication_FullName(
		fullApplication_Name: string
	): Promise<DbApplicationVersion> {
		return await this.sendMessageNoWait<IGetLatestApplicationVersionByApplication_NameIMI, DbApplicationVersion>({
			...this.getCoreFields(),
			fullApplication_Name: fullApplication_Name,
			type: IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME
		})
	}

	async initializeConnection(): Promise<void> {
		while (this.applicationStore.state.appState === AppState.NOT_INITIALIED
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
		const response = await this.localApiServer.handleRequest(request)
		window.parent.postMessage(response, origin)
	}

	private handleDbToIsolateMessage(
		message: IIsolateMessageOut<any>,
		mainDomain: string
	) {
		const messageRecord = this.applicationStore.state.pendingMessageMap.get(message.id);
		if (!messageRecord) {
			return
		}

		let observableMessageRecord: IObservableMessageInRecord<any>
		switch (message.type) {
			// case IsolateMessageType.APP_INITIALIZING:
			// 	this.mainDomain = mainDomain
			// 	this.pendingMessageMap.delete(message.id);
			// 	return
			case IsolateMessageType.SEARCH:
			case IsolateMessageType.SEARCH_ONE:
				observableMessageRecord = this.applicationStore.state.observableMessageMap.get(message.id)
				if (!observableMessageRecord || !observableMessageRecord.observer) {
					return
				}
				if (message.errorMessage) {
					observableMessageRecord.observer.error(message.errorMessage)
				} else {
					observableMessageRecord.observer.next(message.result)
				}
				return
			case IsolateMessageType.SEARCH_UNSUBSCRIBE:
				observableMessageRecord = this.applicationStore.state.observableMessageMap.get(message.id)
				if (!observableMessageRecord || !observableMessageRecord.observer) {
					return
				}
				observableMessageRecord.observer.complete()
				this.applicationStore.state.pendingMessageMap.delete(message.id)
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
		this.applicationStore.state.observableMessageMap.set(coreFields.id, observableMessageRecord)
		const observable = new Observable((observer: Observer<any>) => {
			observableMessageRecord.observer = observer
			return () => {
				this.sendMessage<IIsolateMessage, null>({
					...coreFields,
					type: IsolateMessageType.SEARCH_UNSUBSCRIBE
				}).then()
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
			case AppState.NOT_INITIALIED:
				break;
			case AppState.INITIALIZING_IN_PROGRESS:
				return false
			case AppState.START_INITIALIZING:
				this.applicationStore.state.appState = AppState.INITIALIZING_IN_PROGRESS
				await this.applicationLoader.load(this.terminalStore.getLastIds())
				this.applicationStore.state.appState = AppState.INITIALIZED
				await this.applicationLoader.initialize()
				window.parent.postMessage({
					...this.getCoreFields(),
					fullApplication_Name: this.dbApplicationUtils.
						getApplication_FullName(
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
		domainName: Domain_Name
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
