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
	IsolateMessageType
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
			const ownDomain = window.location.hostname
			const mainDomainFragments = ownDomain.split('.')
			if (mainDomainFragments[0] === 'www') {
				mainDomainFragments.splice(0, 1)
			}
			const domainPrefix = '.' + mainDomainFragments.join('.')
			const origin = event.origin;
			// Only accept requests from https protocol and .federateddb
			if (!origin.startsWith("https") || !origin.endsWith(domainPrefix)) {
				return
			}
			const sourceDomainNameFragments = origin.split('//')[1].split('.')
			// Only accept requests from '${schemaName}.${mainDomainName}'
			if (sourceDomainNameFragments.length != mainDomainFragments.length + 1) {
				return
			}
			// Only accept requests from non-'www' domain (don't accept requests from self)
			if (sourceDomainNameFragments[0] === 'www') {
				return
			}

		});
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
		let message: IAddRepositoryIMI = {
			distributionStrategy,
			id: ++this.messageId,
			isolateId: window.location.hostname,
			name,
			platform,
			platformConfig,
			type: IsolateMessageType.ADD_REPOSITORY,
			url
		}
		window.postMessage(message, "localhost")

		
		return new Promise<number>((resolve, reject) => {
			this.pendingMessageMap.set(message.id, {
				message,
				resolve,
				reject
			})
		})
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		throw new Error('Not implemented');
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<E> {
		throw new Error('Not implemented');
	}

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<Observable<EntityArray>> {
		throw new Error('Not implemented');
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<Observable<E>> {
		throw new Error('Not implemented');
	}

	/**
	 * This is a TIQL Insert statement coming from the client.
	 * It will have an id of the operation to be invoked, as
	 * well as the parameters for this specific operation.
	 * The operation will then be looked up from the schema,
	 * parsed, cached (if appropriate) and executed.
	 * 
	 * NOTE: some of these operations will be internal 
	 * 
	 * In a client Dao this will look like:
	 * 
	 * @Prepared()
	 * @Insert(...)
	 * 
	 */
	insert(
		// todo define parameters
	) {
		throw new Error(`TODO: implement`)
	}

	/**
	 * @Update(...)
	 */
	update(
		// todo define parameters
	) {
		throw new Error(`TODO: implement`)
	}

	/**
	 * @Delete(...)
	 */
	delete(
		// todo define parameters
	) {
		throw new Error(`TODO: implement`)
	}

	async save<E, T = E | E[]>(
		entity: T,
		context: IContext,
	): Promise<ISaveResult> {
		throw new Error('Not implemented');
	}

	async insertValues(
		portableQuery: PortableQuery,
		context: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		throw new Error('Not implemented');
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number[] | string[] | number[][] | string[][]> {
		throw new Error('Not implemented');
	}

	async updateValues(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		throw new Error('Not implemented');
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		throw new Error('Not implemented');
	}

}

DI.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector);

