import {
	IEntityContext,
	IQueryContext
} from '@airport/air-control';
import { IApplicationVersion } from '@airport/airspace'
import { ICoreLocalApiRequest, ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import {
	IContext
} from '@airport/direction-indicator';
import {
	DbDomain,
	DomainName,
	getFullApplicationName,
	ISaveResult,
	ITransactionalConnector,
	PortableQuery
} from '@airport/ground-control';
import {
	IAddRepositoryIMI,
	IGetLatestApplicationVersionByApplicationNameIMI,
	IInitConnectionIMI,
	IInitConnectionIMO,
	IIsolateMessage,
	IIsolateMessageOut,
	IsolateMessageType,
	IPortableQueryIMI,
	IReadQueryIMI,
	IRetrieveDomainIMI,
	ISaveIMI,
	LastIds,
	ICallApiIMI,
	IApplicationLoader,
	ILocalAPIServer
} from '@airport/security-check';
import {
	Observable,
	Observer
} from 'rxjs';
import { v4 as uuidv4 } from "uuid";

export interface IMessageInRecord {
	message: IIsolateMessage
	reject
	resolve
}

export interface IObservableMessageInRecord<T> {
	id: string
	observer?: Observer<T>
}

// FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
// and debugging (http://localhost:7500)
export const hostServer = 'http://localhost:7500'

export enum AppState {
	NOT_INITIALIED = 'NOT_INITIALIED',
	START_INITIALIZING = 'START_INITIALIZING',
	INITIALIZING_IN_PROGRESS = 'INITIALIZING_IN_PROGRESS',
	INITIALIZED = 'INITIALIZED'
}

export interface IIframeTransactionalConnector
	extends ITransactionalConnector {

	getLatestApplicationVersionMapByFullApplicationName(
		applicationName: string
	): Promise<IApplicationVersion>

	retrieveDomain(
		domainName: DomainName
	): Promise<DbDomain>

}

export class IframeTransactionalConnector
	implements IIframeTransactionalConnector {

	applicationLoader: IApplicationLoader
	localApiServer: ILocalAPIServer

	application: string
	appState = AppState.NOT_INITIALIED
	dbName: string;
	domain: string
	lastIds: LastIds
	// FIXME: tie this in to the hostServer variable
	mainDomain: string
	messageId = 0;
	observableMessageMap: Map<string, IObservableMessageInRecord<any>> = new Map()
	pendingMessageMap: Map<string, IMessageInRecord> = new Map();
	serverUrl: string;

	messageCallback: (
		message: any
	) => void

	async init() {
		window.addEventListener("message", event => {
			const message: IIsolateMessageOut<any> | ILocalAPIRequest = event.data;
			if (message.__received__) {
				return
			}
			message.__received__ = true

			if (this.messageCallback) {
				const receivedDate = new Date()
				message.__receivedTime__ = receivedDate.getTime()
				this.messageCallback(message)
			}

			const origin = event.origin;
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
					|| ownDomain !== getFullApplicationName({
						domain: message.domain,
						name: message.application,
					}) + domainSuffix) {
					return
				}
				const ownDomainFragments = ownDomain.split('.')
				// Only accept requests from 'www.${mainDomainName}' or 'www.${mainDomainName}'
				// All 'App' messages must first come from the main domain, which ensures
				// that the application is installed
				const expectedNumFragments = mainDomainFragments.length + (startsWithWww ? 0 : 1)
				if (ownDomainFragments.length !== expectedNumFragments) {
					return
				}
			}
			switch (message.category) {
				case 'FromClientRedirected':
					this.handleLocalApiRequest(message as ILocalAPIRequest, origin).then()
					return
				case 'FromDb':
					this.domain = message.domain
					this.application = message.application
					if (message.type === IsolateMessageType.APP_INITIALIZING) {
						if (this.appState === AppState.NOT_INITIALIED) {
							let initConnectionIMO: IInitConnectionIMO = message
							this.lastIds = initConnectionIMO.result
							this.appState = AppState.START_INITIALIZING
						}
						return
					}
					this.handleDbToIsolateMessage(message as IIsolateMessageOut<any>, mainDomain)
					return
				default:
					return
			}

		})
		this.initializeConnection().then()
	}

	async callApi<Request, Response>(
		apiInput: ICoreLocalApiRequest
	): Promise<ILocalAPIResponse> {
		return await this.sendMessage<ICallApiIMI, ILocalAPIResponse>({
			...this.getCoreFields(),
			args: apiInput.args,
			methodName: apiInput.methodName,
			objectName: apiInput.objectName,
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

	async save<E, T = E | E[]>(
		entity: T,
		context: IEntityContext,
	): Promise<ISaveResult> {
		const dbEntity = context.dbEntity;
		return await this.sendMessage<ISaveIMI<any, any>, ISaveResult>({
			...this.getCoreFields(),
			dbEntity: {
				id: dbEntity.id,
				applicationVersionId: dbEntity.applicationVersion.id
			},
			entity,
			type: IsolateMessageType.SAVE
		})
	}

	async saveToDestination<E, T = E | E[]>(
		repositoryDestination: string,
		entity: T,
		context?: IContext,
	): Promise<ISaveResult> {
		const dbEntity = context.dbEntity;
		return await this.sendMessage<ISaveIMI<any, any>, ISaveResult>({
			...this.getCoreFields(),
			dbEntity: {
				id: dbEntity.id,
				applicationVersionId: dbEntity.applicationVersion.id
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

	async insertValuesGetIds(
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

	async getLatestApplicationVersionMapByFullApplicationName(
		fullApplicationName: string
	): Promise<IApplicationVersion> {
		return await this.sendMessageNoWait<IGetLatestApplicationVersionByApplicationNameIMI, IApplicationVersion>({
			...this.getCoreFields(),
			fullApplicationName: fullApplicationName,
			type: IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME
		})
	}

	private async initializeConnection() {
		while (this.appState === AppState.NOT_INITIALIED
			|| this.appState === AppState.START_INITIALIZING) {
			await this.isConnectionInitialized()
			await this.wait(100)
		}
	}

	private async handleLocalApiRequest(
		request: ILocalAPIRequest,
		origin: string
	) {
		while (this.appState !== AppState.INITIALIZED) {
			await this.wait(100)
		}
		const response = await this.localApiServer.handleRequest(request)
		window.parent.postMessage(response, origin)
	}

	private handleDbToIsolateMessage(
		message: IIsolateMessageOut<any>,
		mainDomain: string
	) {

		const messageRecord = this.pendingMessageMap.get(message.id);
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
				observableMessageRecord = this.observableMessageMap.get(message.id)
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
				observableMessageRecord = this.observableMessageMap.get(message.id)
				if (!observableMessageRecord || !observableMessageRecord.observer) {
					return
				}
				observableMessageRecord.observer.complete()
				this.pendingMessageMap.delete(message.id)
				return
		}

		if (message.errorMessage) {
			messageRecord.reject(message.errorMessage)
		} else {
			messageRecord.resolve(message.result)
		}
		this.pendingMessageMap.delete(message.id)
	}

	private getCoreFields(): {
		application: string,
		category: 'ToDb',
		domain: string,
		id: string,
	} {
		return {
			application: this.application,
			category: 'ToDb',
			domain: this.domain,
			id: uuidv4(),
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
		window.parent.postMessage(message, hostServer)
		return new Promise<ReturnType>((resolve, reject) => {
			this.pendingMessageMap.set(message.id, {
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
		this.observableMessageMap.set(coreFields.id, observableMessageRecord)
		const observable = new Observable((observer: Observer<any>) => {
			observableMessageRecord.observer = observer
			return () => {
				this.sendMessage<IIsolateMessage, null>({
					...coreFields,
					type: IsolateMessageType.SEARCH_UNSUBSCRIBE
				}).then()
			};
		});
		window.parent.postMessage(message, hostServer)

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
		switch (this.appState) {
			case AppState.NOT_INITIALIED:
				break;
			case AppState.INITIALIZING_IN_PROGRESS:
				return false
			case AppState.START_INITIALIZING:
				this.appState = AppState.INITIALIZING_IN_PROGRESS
				await this.applicationLoader.load(this.lastIds)
				this.appState = AppState.INITIALIZED
				await this.applicationLoader.initialize()
				window.parent.postMessage({
					...this.getCoreFields(),
					fullApplicationName: getFullApplicationName(
						this.applicationLoader.getApplication()),
					type: IsolateMessageType.APP_INITIALIZED
				}, hostServer)
				return true
			case AppState.INITIALIZED:
				return true
		}

		let jsonApplication = this.applicationLoader.getApplication()
		this.domain = jsonApplication.domain
		this.application = jsonApplication.name

		let message: IInitConnectionIMI = {
			...this.getCoreFields(),
			jsonApplication,
			type: IsolateMessageType.APP_INITIALIZING
		}

		window.parent.postMessage(message, hostServer)
		return false
	}

	async retrieveDomain(
		domainName: DomainName
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
		this.messageCallback = callback
	}

}
