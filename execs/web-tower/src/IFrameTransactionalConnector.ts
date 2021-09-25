import { IQueryContext } from '@airport/air-control';
import { ILocalAPIRequest } from '@airport/autopilot';
import {
	container,
	DI,
	IContext
} from '@airport/di';
import {
	DistributionStrategy,
	ISaveResult,
	ITransactionalConnector,
	PlatformType,
	PortableQuery,
	TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control';
import {
	IAddRepositoryIMI,
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
import { LOCAL_API_SERVER } from '@airport/tower'
import {
	APPLICATION_INITIALIZER
} from '@airport/security-check'
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
	NOT_INITIALIED,
	START_INITIALIZING,
	INITIALIZING_IN_PROGRESS,
	INITIALIZED
}

export class IframeTransactionalConnector
	implements ITransactionalConnector {

	dbName: string;
	serverUrl: string;

	pendingMessageMap: Map<number, IMessageInRecord> = new Map();

	observableMessageMap: Map<number, IObservableMessageInRecord<any>> = new Map()

	messageId = 0;

	// FIXME: tie this in to the hostServer variable
	mainDomain: string

	appState = AppState.NOT_INITIALIED
	lastIds: LastIds

	async init() {
		window.addEventListener("message", event => {
			const message: IIsolateMessageOut<any> | ILocalAPIRequest = event.data;
			if ((message as any).__handled__) {
				return
			}
			(message as any).__handled__ = true

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
				case 'Db':
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
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		context: IContext
	): Promise<number> {
		return await this.sendMessage<IAddRepositoryIMI, number>({
			...this.getCoreFields(),
			distributionStrategy,
			name,
			platform,
			platformConfig,
			type: IsolateMessageType.ADD_REPOSITORY,
			url
		})
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		return await this.sendMessage<IReadQueryIMI, EntityArray>({
			...this.getCoreFields(),
			cachedSqlQueryId,
			portableQuery,
			type: IsolateMessageType.FIND
		})
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<E> {
		return await this.sendMessage<IReadQueryIMI, E>({
			...this.getCoreFields(),
			cachedSqlQueryId,
			portableQuery,
			type: IsolateMessageType.FIND_ONE
		})
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
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
		context: IQueryContext<E>,
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
		context: IContext,
	): Promise<ISaveResult> {
		return await this.sendMessage<ISaveIMI<any, any>, ISaveResult>({
			...this.getCoreFields(),
			entity,
			type: IsolateMessageType.SAVE
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
		category: 'Db',
		id: number,
		schemaSignature: string
	} {
		return {
			category: 'Db',
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
		context: IQueryContext<E>,
		type: IsolateMessageType,
		cachedSqlQueryId?: number
	): Observable<T> {
		const coreFields = this.getCoreFields()
		let message = {
			...coreFields,
			cachedSqlQueryId,
			portableQuery,
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


}

DI.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector);

export function loadIframeTransactionalConnector() {
	console.log('IframeTransactionalConnector loaded')
}