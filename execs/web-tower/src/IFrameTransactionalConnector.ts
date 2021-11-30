import {
	IEntityContext,
	IQueryContext
} from '@airport/air-control';
import { ILocalAPIRequest } from '@airport/autopilot';
import {
	container,
	DI,
	IContext
} from '@airport/di';
import {
	AIRepository,
	DistributionStrategy,
	getSchemaName,
	ISaveResult,
	ITransactionalConnector,
	PlatformType,
	PortableQuery,
	TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control';
import {
	IAddRepositoryIMI,
	IGetLatestSchemaVersionBySchemaNameIMI,
	IInitConnectionIMI,
	IIsolateMessage,
	IIsolateMessageOut,
	IsolateMessageType,
	IPortableQueryIMI,
	IReadQueryIMI,
	ISaveIMI,
	LastIds,
	IInitConnectionIMO
} from '@airport/security-check';
import {
	APPLICATION_INITIALIZER,
	LOCAL_API_SERVER
} from '@airport/security-check'
import { ISchemaVersion } from '@airport/airspace'
import {
	Observable,
	Observer
} from 'rxjs';

export interface IMessageInRecord {
	message: IIsolateMessage
	reject
	resolve
}

export interface IObservableMessageInRecord<T> {
	id: number
	observer?: Observer<T>
}

// FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
// and debugging (http://localhost:7000)
export const hostServer = 'http://localhost:7000'

export enum AppState {
	NOT_INITIALIED = 'NOT_INITIALIED',
	START_INITIALIZING = 'START_INITIALIZING',
	INITIALIZING_IN_PROGRESS = 'INITIALIZING_IN_PROGRESS',
	INITIALIZED = 'INITIALIZED'
}

export interface IIframeTransactionalConnector
	extends ITransactionalConnector {
	getLatestSchemaVersionMapBySchemaName(
		schemaName: string
	): Promise<ISchemaVersion>
}

export class IframeTransactionalConnector
	implements IIframeTransactionalConnector {

	dbName: string;
	serverUrl: string;

	pendingMessageMap: Map<number, IMessageInRecord> = new Map();

	observableMessageMap: Map<number, IObservableMessageInRecord<any>> = new Map()

	messageId = 0;

	// FIXME: tie this in to the hostServer variable
	mainDomain: string

	appState = AppState.NOT_INITIALIED
	lastIds: LastIds

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
			if (message.schemaSignature.indexOf('.') > -1) {
				// Invalid schema signature - cannot have periods that would point to invalid subdomains
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
					// And only if message has the schema signature 
					|| !message.schemaSignature
					// And if own domain is a direct sub-domain of the message's domain
					|| ownDomain !== message.schemaSignature + domainSuffix) {
					return
				}
				const ownDomainFragments = ownDomain.split('.')
				// Only accept requests from 'www.${mainDomainName}' or 'www.${mainDomainName}'
				// All 'App' messages must first come from the main domain, which ensures
				// that the schema is installed
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
			repositorySource: context.repositorySource,
			repositoryUuid: context.repositoryUuid,
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
			repositorySource: context.repositorySource,
			repositoryUuid: context.repositoryUuid,
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
				schemaVersionId: dbEntity.schemaVersion.id
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
				schemaVersionId: dbEntity.schemaVersion.id
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

	async startTransaction(
		context: IContext
	): Promise<boolean> {
		return await this.sendMessage<IIsolateMessage, boolean>({
			...this.getCoreFields(),
			type: IsolateMessageType.START_TRANSACTION
		})
	}

	async commit(
		context: IContext
	): Promise<boolean> {
		return await this.sendMessage<IIsolateMessage, boolean>({
			...this.getCoreFields(),
			type: IsolateMessageType.COMMIT
		})
	}

	async rollback(
		context: IContext
	): Promise<boolean> {
		return await this.sendMessage<IIsolateMessage, boolean>({
			...this.getCoreFields(),
			type: IsolateMessageType.ROLLBACK
		})
	}

	async getLatestSchemaVersionMapBySchemaName(
		schemaName: string
	): Promise<ISchemaVersion> {
		return await this.sendMessageNoWait<IGetLatestSchemaVersionBySchemaNameIMI, ISchemaVersion>({
			...this.getCoreFields(),
			schemaName,
			type: IsolateMessageType.GET_LATEST_SCHEMA_VERSION_BY_SCHEMA_NAME
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
		const localApiServer = await container(this).get(LOCAL_API_SERVER)
		const response = await localApiServer.handleRequest(request)
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
		category: 'ToDb',
		id: number,
		schemaSignature: string
	} {
		return {
			category: 'ToDb',
			id: ++this.messageId,
			schemaSignature: window.location.hostname.split('.')[0],
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
			repositorySource: context.repositorySource,
			repositoryUuid: context.repositoryUuid,
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
				const applicationInitializer = await container(this).get(APPLICATION_INITIALIZER)
				await applicationInitializer.initialize(this.lastIds)
				this.appState = AppState.INITIALIZED
				window.parent.postMessage({
					...this.getCoreFields(),
					schemaName: getSchemaName(applicationInitializer.getSchema()),
					type: IsolateMessageType.APP_INITIALIZED
				}, hostServer)
				return true
			case AppState.INITIALIZED:
				return true
		}

		const applicationInitializer = await DI.db().get(APPLICATION_INITIALIZER)

		let message: IInitConnectionIMI = {
			...this.getCoreFields(),
			schema: applicationInitializer.getSchema(),
			type: IsolateMessageType.APP_INITIALIZING
		}

		window.parent.postMessage(message, hostServer)
		return false
	}

	onMessage(callback: (
		message: any
	) => void) {
		this.messageCallback = callback
	}

}

DI.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector);

export function loadIframeTransactionalConnector() {
	console.log('IframeTransactionalConnector loaded')
}