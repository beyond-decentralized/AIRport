import {IContext}      from '@airport/di'
import {Observable}   from 'rxjs'
import {PortableQuery} from '../query/PortableQuery'
import {DbEntity}      from '../schema/Entity'
import {
	DomainName,
	SchemaName
}                      from '../schema/Schema'
import {SchemaStatus}  from '../schema/SchemaStatus'
import {
	InternalFragments,
	IStoreOperator
}                      from './IStoreOperator'
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
		tableName: string,
		context: IContext,
	): Promise<boolean>

	dropTable(
		schemaName: string,
		tableName: string,
		context: IContext,
	): Promise<boolean>

	getEntityTableName(
		dbEntity: DbEntity,
		context: IContext,
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
		},
		context: IContext,
	): string;

	initialize(
		dbName: string,
		context: IContext,
	): Promise<any>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray>;

	searchOne<E>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IContext,
		cachedSqlQueryId?: number,
	): Observable<E>;

	transact(
		transactionalCallback: {
			(
				transaction: IStoreDriver
			): Promise<void> | void
		},
		context: IContext,
	): Promise<void>

	isServer(
		context?: IContext,
	): boolean

}
