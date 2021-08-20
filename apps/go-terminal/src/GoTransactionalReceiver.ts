import { IQueryContext } from '@airport/air-control';
import {
	container,
	DI,
	IContext
} from '@airport/di';
import {
	DistributionStrategy,
	ISaveResult,
	PlatformType,
	PortableQuery,
	TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control';
import {
	IAddRepositoryIMI, IIsolateMessageIn, IsolateMessageInType } from '@airport/security-check';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { Observable } from 'rxjs';

var _isServer = false;

export function setIsServer(): void {
	_isServer = true;
}

export function isServer(): boolean {
	return _isServer;
}

export class GoTransactionalReceiver {

	dbName: string;
	serverUrl: string;

	public WebTransactionalReceiver() {
		window.addEventListener("message", (event) => {
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
			const schemaHash = sourceDomainNameFragments[0]
			const message: IIsolateMessageIn = event.data
			const isolateId = message.isolateId
			// FIXME: check schemaHash and isolateId and make sure they result in a match (isolate Id is passed in as a URL parameter)

			this.processMessage(message).then()
			
		}, false)
	}
	

	async processMessage(
		message: IIsolateMessageIn
	) {
		const transServer = await container(this).get(TRANSACTIONAL_SERVER);
		let result
		switch (message.type) {
			case IsolateMessageInType.ADD_REPOSITORY:
				const addRepositoryMessage: IAddRepositoryIMI = <IAddRepositoryIMI> message
				result = await transServer.addRepository(
					addRepositoryMessage.name,
					addRepositoryMessage.url,
					addRepositoryMessage.platform,
					addRepositoryMessage.platformConfig,
					addRepositoryMessage.distributionStrategy,
					{
						domainAndPort: 'test'
					},
					{}
				);
				break
			case IsolateMessageInType.COMMIT:
				
				break
			case IsolateMessageInType.DELETE_WHERE:
				break
			case IsolateMessageInType.FIND:
				break
			case IsolateMessageInType.FIND_ONE:
				break
			case IsolateMessageInType.INSERT_VALUES:
				break
			case IsolateMessageInType.INSERT_VALUES_GET_IDS:
				break
			case IsolateMessageInType.ROLLBACK:
				break
			case IsolateMessageInType.SAVE:
				break
			case IsolateMessageInType.SEARCH:
				break
			case IsolateMessageInType.SEARCH_ONE:
				break
			case IsolateMessageInType.START_TRANSACTION:
				break
			case IsolateMessageInType.UPDATE_VALUES:
				break
			default:
				// Unexpected IsolateMessageInType
				return
		}
	}

	async respondToMessage(
		messageIn: IIsolateMessageIn
	) {

	}

	async init(): Promise<void> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		await transServer.init();
	}

	async addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		context: IContext
	): Promise<number> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.addRepository(
			name,
			url,
			platform,
			platformConfig,
			distributionStrategy,
			{
				domainAndPort: 'test'
			},
			context
		);
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.find(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			context,
			cachedSqlQueryId
		);
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<E> {

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.findOne(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			context,
			cachedSqlQueryId
		);
	}

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<Observable<EntityArray>> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.search(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			context,
			cachedSqlQueryId
		);
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext<E>,
		cachedSqlQueryId?: number,
	): Promise<Observable<E>> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.searchOne(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			context,
			cachedSqlQueryId
		);
	}

	async save<E, T = E | E[]>(
		entity: T,
		context: IContext,
	): Promise<ISaveResult> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER);

		return await transServer.save(entity, null, context);
	}

	async insertValues(
		portableQuery: PortableQuery,
		context: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER)

		return await transServer.insertValues(
			portableQuery, null, context, ensureGeneratedValues)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER)

		return await transServer.insertValuesGetIds(portableQuery, null, context)
	}

	async updateValues(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER)

		return await transServer.updateValues(portableQuery, null, context)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		if (!isServer()) {
			throw new Error('Not implemented');
		}

		const transServer = await container(this).get(TRANSACTIONAL_SERVER)

		return await transServer.deleteWhere(portableQuery, null, context)
	}

}

DI.set(TRANSACTIONAL_CONNECTOR, TransactionalConnector);

export function injectTransactionalConnector(): void {
	// console.log('Injecting TransactionalConnector')
}
