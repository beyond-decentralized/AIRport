import { IContext } from '@airport/di'
import { Observable } from 'rxjs'
import { PortableQuery } from '@airport/ground-control/src/lingo/query/PortableQuery'
import { DbEntity } from '@airport/ground-control/src/lingo/application/Entity'
import {
	ApplicationName,
	DomainName,
	FullApplicationName
} from '@airport/ground-control/src/lingo/application/Application'
import {
	InternalFragments,
	IStoreOperator
} from '@airport/ground-control/src/lingo/data/IStoreOperator'
import { StoreType } from '@airport/ground-control/src/lingo/data/storeInfo'
import { ITransaction } from '../../transaction/ITransaction'
import { IOperationContext } from '../../processing/OperationContext'

/**
 * Created by Papa on 6/10/2016.
 */

export const INVALID_TABLE_NAME = 'A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890'

export interface IStoreDriver
	extends IStoreOperator {

	type: StoreType;

	doesTableExist(
		applicationName: string,
		tableName: string,
		context: IContext,
	): Promise<boolean>

	dropTable(
		applicationName: string,
		tableName: string,
		context: IContext,
	): Promise<boolean>

	getEntityTableName(
		dbEntity: DbEntity,
		context: IContext,
	): string

	getTableName(
		application: {
			domain: DomainName | {
				name: DomainName
			}; name: ApplicationName; fullName?: FullApplicationName;
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
		parentTransaction?: ITransaction
	): Promise<void>

	setupTransaction(
		context: IOperationContext,
		parentTransaction?: ITransaction,
	): Promise<ITransaction>

	tearDownTransaction(
		transaction: ITransaction,
		context: IOperationContext,
	): Promise<void>

	startTransaction(
		transaction: ITransaction,
		context?: IOperationContext,
	): Promise<void>

	commit(
		transaction: ITransaction,
		context?: IOperationContext,
	): Promise<void>

	rollback(
		transaction: ITransaction,
		context?: IOperationContext,
	): Promise<void>

	isServer(
		context?: IContext,
	): boolean

}
