import { IContext } from '@airport/di';
import { IObservable } from '@airport/observe';
import { PortableQuery } from '../query/PortableQuery';
import { DbEntity } from '../schema/Entity';
import { DomainName, SchemaName } from '../schema/Schema';
import { SchemaStatus } from '../schema/SchemaStatus';
import { InternalFragments, IStoreOperator } from './IStoreOperator';
import { StoreType } from './storeInfo';
/**
 * Created by Papa on 6/10/2016.
 */
export declare const INVALID_TABLE_NAME = "A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890";
export interface IStoreDriver extends IStoreOperator {
    type: StoreType;
    doesTableExist(schemaName: string, tableName: string, ctx: IContext): Promise<boolean>;
    dropTable(schemaName: string, tableName: string, ctx: IContext): Promise<boolean>;
    getEntityTableName(dbEntity: DbEntity, ctx: IContext): string;
    getTableName(schema: {
        domain: DomainName | {
            name: DomainName;
        };
        name: SchemaName;
        status?: SchemaStatus;
    }, table: {
        name: string;
        tableConfig?: {
            name?: string;
        };
    }, ctx: IContext): string;
    initialize(dbName: string, ctx: IContext): Promise<any>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, ctx: IContext, cachedSqlQueryId?: number): IObservable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, ctx: IContext, cachedSqlQueryId?: number): IObservable<E>;
    transact(transactionalCallback: {
        (transaction: IStoreDriver): Promise<void>;
    }, ctx: IContext): Promise<void>;
    isServer(ctx: IContext): boolean;
}
//# sourceMappingURL=StoreDriver.d.ts.map