import {IObservable}   from '@airport/observe'
import {PortableQuery} from '../query/PortableQuery'
import {
	DomainName,
	SchemaName
}                      from '../schema/Schema'
import {
	DbEntity
}                      from '../schema/Entity'
import {SchemaStatus}  from '../schema/SchemaStatus'
import {
	InternalFragments,
	IStoreOperator
}                      from './IStoreOperator'
import {ITransaction}  from './ITransaction'
import {StoreType}     from './storeInfo'

/**
 * Created by Papa on 6/10/2016.
 */

export const INVALID_TABLE_NAME = 'A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890'

export interface IStoreDriver
	extends IStoreOperator {

	type: StoreType;

	doesTableExist(
		schemaName: string,
		tableName: string
	): Promise<boolean>

	dropTable(
		schemaName: string,
		tableName: string
	): Promise<boolean>

	getEntityTableName(
		dbEntity: DbEntity
	): string

	getTableName(
		schema: {
			domain: DomainName | {
				name: DomainName
			}; name: SchemaName; status?: SchemaStatus;
		},
		table: {
			name: string, tableConfig?: {
				name?: string
			}
		}
	): string;

	initialize(
		dbName: string
	): Promise<any>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number,
	): IObservable<EntityArray>;

	searchOne<E>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number,
	): IObservable<E>;

	transact(
		keepAlive?: boolean
	): Promise<ITransaction>;

	numFreeConnections(): number

	isServer(): boolean

}
