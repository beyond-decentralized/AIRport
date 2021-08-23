import { IQueryContext } from '@airport/air-control';
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
	IIsolateMessage,
	IIsolateMessageOut,
	IsolateMessageType,
	IPortableQueryIMI,
	IReadQueryIMI,
	ISaveIMI
} from '@airport/security-check';
import {
	Observable,
	Observer,
	Subscription
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

export class IframeTransactionalConnector
	implements ITransactionalConnector {

	dbName: string;
	serverUrl: string;

	pendingMessageMap: Map<number, IMessageInRecord> = new Map();

	observableMessageMap: Map<number, IObservableMessageInRecord<any>> = new Map()

	messageId = 0;

	mainDomain: string

	constructor() {
		window.addEventListener("message", event => {
			const message: IIsolateMessageOut<any> = event.data
			const origin = event.origin;
			const mainDomain = origin.split('//')[1]
			const mainDomainFragments = mainDomain.split('.')
			let startsWithWww = false
			if (mainDomainFragments[0] === 'www') {
				mainDomainFragments.splice(0, 1)
				startsWithWww = true
			}
			const domainPrefix = '.' + mainDomain
			const ownDomain = window.location.hostname
			// Only accept requests from https protocol
			if (!origin.startsWith("https")
				|| origin !== message.isolateId
				|| !ownDomain.endsWith(domainPrefix)) {
				return
			}
			const ownDomainFragments = ownDomain.split('.')
			// Only accept requests from 'www.${mainDomainName}' or 'www.${mainDomainName}'
			const expectedNumFragments = mainDomainFragments.length + (startsWithWww ? 0 : 1)
			if (ownDomainFragments.length !== expectedNumFragments
			) {
				return
			}
			// Don't accept requests from self
			if (mainDomain === ownDomain) {
				return
			}

			const messageRecord = this.pendingMessageMap.get(message.id);
			if (!messageRecord) {
				return
			}

			let observableMessageRecord: IObservableMessageInRecord<any>
			switch (message.type) {
				case IsolateMessageType.INIT_CONNECTION:
					this.mainDomain = mainDomain
					this.pendingMessageMap.delete(message.id);
					return
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
		})
		this.sendMessage<IIsolateMessage, null>({
			...this.getCoreFields(),
			type: IsolateMessageType.INIT_CONNECTION
		})
	}

	async init(): Promise<void> {
		throw new Error('Not implemented');
	}

	async addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		context: IContext
	): Promise<number> {
		return this.sendMessage<IAddRepositoryIMI, number>({
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
		return this.sendMessage<IReadQueryIMI, EntityArray>({
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
		return this.sendMessage<IReadQueryIMI, E>({
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
		return this.sendMessage<ISaveIMI<any, any>, ISaveResult>({
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
		return this.sendMessage<IPortableQueryIMI, number>({
			...this.getCoreFields(),
			portableQuery,
			type: IsolateMessageType.INSERT_VALUES
		})
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number[]> {
		return this.sendMessage<IPortableQueryIMI, number[]>({
			...this.getCoreFields(),
			portableQuery,
			type: IsolateMessageType.INSERT_VALUES_GET_IDS
		})
	}

	async updateValues(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		return this.sendMessage<IPortableQueryIMI, number>({
			...this.getCoreFields(),
			portableQuery,
			type: IsolateMessageType.UPDATE_VALUES
		})
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		return this.sendMessage<IPortableQueryIMI, number>({
			...this.getCoreFields(),
			portableQuery,
			type: IsolateMessageType.DELETE_WHERE
		})
	}

	async startTransaction(
		context: IContext
	): Promise<boolean> {
		return this.sendMessage<IIsolateMessage, boolean>({
			...this.getCoreFields(),
			type: IsolateMessageType.START_TRANSACTION
		})
	}

	async commit(
		context: IContext
	): Promise<boolean> {
		return this.sendMessage<IIsolateMessage, boolean>({
			...this.getCoreFields(),
			type: IsolateMessageType.COMMIT
		})
	}

	async rollback(
		context: IContext
	): Promise<boolean> {
		return this.sendMessage<IIsolateMessage, boolean>({
			...this.getCoreFields(),
			type: IsolateMessageType.ROLLBACK
		})
	}

	private getCoreFields() {
		return {
			id: ++this.messageId,
			isolateId: window.location.hostname,
		}
	}

	private sendMessage<IMessageIn extends IIsolateMessage, ReturnType>(
		message: IMessageIn
	): Promise<ReturnType> {
		window.postMessage(message, "localhost")
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
				})
			};
		});
		window.postMessage(message, this.mainDomain)

		return observable;
	}


}

DI.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector);

