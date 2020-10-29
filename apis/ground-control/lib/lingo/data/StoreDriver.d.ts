import { IObservable } from '@airport/observe';
import { PortableQuery } from '../query/PortableQuery';
import { InternalFragments, IStoreOperator } from './IStoreOperator';
import { ITransaction } from './ITransaction';
import { StoreType } from './storeInfo';
/**
 * Created by Papa on 6/10/2016.
 */
export declare const INVALID_TABLE_NAME = "A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890";
export interface IStoreDriver extends IStoreOperator {
    type: StoreType;
    doesTableExist(schemaName: string, tableName: string): Promise<boolean>;
    dropTable(schemaName: string, tableName: string): Promise<boolean>;
    initialize(dbName: string): Promise<any>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): IObservable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): IObservable<E>;
    transact(keepAlive?: boolean): Promise<ITransaction>;
}
//# sourceMappingURL=StoreDriver.d.ts.map