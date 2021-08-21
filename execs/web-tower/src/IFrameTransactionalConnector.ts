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
import { Observable } from 'rxjs';

export interface IMessageInRecord {
	message: IIsolateMessage
	reject
	resolve
}

export class IframeTransactionalConnector
	implements ITransactionalConnector {

	dbName: string;
	serverUrl: string;

	pendingMessageMap: Map<number, IMessageInRecord> = new Map();

	messageId = 0;

	constructor() {
		window.addEventListener("message", event => {
			const message: IIsolateMessageOut<any> = event.data
			const mainDomainFragments = message.isolateId.split('.')
			let startsWithWww = false
			if (mainDomainFragments[0] === 'www') {
				mainDomainFragments.splice(0, 1)
				startsWithWww = true
			}
			const domainPrefix = '.' + mainDomainFragments.join('.')
			const origin = event.origin;
			const ownDomain = window.location.hostname
			// Only accept requests from https protocol
			if (!origin.startsWith("https")
				|| origin !== message.isolateId
				|| !ownDomain.endsWith(domainPrefix)) {
				return
			}
			const sourceDomainNameFragments = origin.split('//')[1].split('.')
			// Only accept requests from 'www.${mainDomainName}' or 'www.${mainDomainName}'
			const expectedNumFragments = mainDomainFragments.length + (startsWithWww ? 0 : 1)
			if (sourceDomainNameFragments.length !== expectedNumFragments
			) {
				return
			}
			// Only accept requests from non-'www' domain (don't accept requests from self)
			if (sourceDomainNameFragments[0] === 'www') {
				return
			}

			const messageRecord = this.pendingMessageMap.get(message.id);
			if (!messageRecord) {
				return
			}

			if (message.errorMessage) {
				messageRecord.reject(message.errorMessage)
			} else {
				messageRecord.resolve(message.result)
			}

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

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<Observable<EntityArray>> {
		return this.sendMessage<IReadQueryIMI, Observable<EntityArray>>({
			...this.getCoreFields(),
			cachedSqlQueryId,
			portableQuery,
			type: IsolateMessageType.SEARCH
		})
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<Observable<E>> {
		return this.sendMessage<IReadQueryIMI, Observable<E>>({
			...this.getCoreFields(),
			cachedSqlQueryId,
			portableQuery,
			type: IsolateMessageType.SEARCH_ONE
		})
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

}

DI.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector);

