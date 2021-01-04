import { DbEntity, DbRelation, JoinType, JSONBaseOperation, JSONEntityRelation, JSONJoinRelation, JSONRelation, JSONViewJoinRelation } from '@airport/ground-control';
import { IAirportDatabase } from '../../../lingo/AirportDatabase';
import { IFieldColumnAliases } from '../../../lingo/core/entity/Aliases';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IFrom, IQEntity, IQEntityDriver, IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IJoinFields } from '../../../lingo/core/entity/Joins';
import { IQInternalRelation } from '../../../lingo/core/entity/Relation';
import { IQOperableFieldInternal } from '../../../lingo/core/field/OperableField';
import { IEntityDatabaseFacade } from '../../../lingo/core/repository/EntityDatabaseFacade';
import { RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { ISchemaUtils } from '../../../lingo/utils/SchemaUtils';
import { FieldColumnAliases } from './Aliases';
/**
 * Created by Papa on 4/21/2016.
 */
export interface IQEntityInternalConstructor<T> {
    entityConstructor: {
        new (...args: any[]): any;
    };
    schemaHash: string;
    entityIndex: number;
    new <IQE extends IQEntityInternal<T>>(...args: any[]): IQE;
}
export declare namespace QEntity {
    function db<IEntity>(databaseName?: string): IEntityDatabaseFacade<IEntity, IEntitySelectProperties, IEntityCreateProperties, IEntityUpdateProperties, IEntityUpdateColumns, IEntityIdProperties, IEntityCascadeGraph, IQEntity<IEntity>>;
}
export interface QEntityConstructor<IEntity> {
    new <IQE extends IQEntityInternal<IEntity>>(dbEntity: DbEntity, fromClausePosition?: number[], dbRelation?: DbRelation, joinType?: JoinType, QDriver?: {
        new (...args: any[]): IQEntityDriver<IEntity>;
    }): IQE;
}
export declare function QEntity<IEntity>(dbEntity: DbEntity, fromClausePosition?: number[], dbRelation?: any, joinType?: JoinType, QDriver?: {
    new (...args: any[]): IQEntityDriver<IEntity>;
}): void;
export declare class QEntityDriver<IEntity> implements IQEntityDriver<IEntity> {
    dbEntity: DbEntity;
    fromClausePosition: number[];
    dbRelation: DbRelation;
    joinType: JoinType;
    private qEntity;
    entityFieldMap: {
        [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any>;
    };
    entityRelations: IQInternalRelation<any, any>[];
    entityRelationMapByIndex: {
        [relationPropertyIndex: number]: IQInternalRelation<any, any>;
    };
    idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    relations: IQInternalRelation<any, any>[];
    currentChildIndex: number;
    joinWhereClause: JSONBaseOperation;
    parentJoinEntity: IQEntityInternal<any>;
    private entityRelationMap;
    private oneToManyConfigMap;
    constructor(dbEntity: DbEntity, fromClausePosition: number[], dbRelation: DbRelation, joinType: JoinType, qEntity: IQEntityInternal<IEntity>);
    getInstance(airDb: IAirportDatabase, schemaUtils: ISchemaUtils): IQEntityInternal<IEntity>;
    getRelationJson(columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONRelation;
    getJoinRelationJson(jsonRelation: JSONJoinRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONJoinRelation;
    getEntityRelationJson(jsonRelation: JSONEntityRelation): JSONEntityRelation;
    getRootRelationJson(jsonRelation: JSONRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONJoinRelation;
    getQ(): IQEntityInternal<IEntity>;
    join<IF extends IFrom>(right: IF, joinType: JoinType): IJoinFields<IF>;
    isRootEntity(): boolean;
    getRootJoinEntity(): IQEntityInternal<any>;
}
export declare function QTree(fromClausePosition: number[], subQuery: RawTreeQuery<any>): void;
export interface IQTreeDriver<T> extends IQEntityDriver<T> {
    subQuery: RawTreeQuery<any>;
}
export declare class QTreeDriver<IEntity> extends QEntityDriver<IEntity> implements IQTreeDriver<IEntity> {
    subQuery: RawTreeQuery<any>;
    getInstance(airDb: IAirportDatabase, schemaUtils: ISchemaUtils): IQEntityInternal<IEntity>;
    getJoinRelationJson(jsonRelation: JSONViewJoinRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONViewJoinRelation;
    getRootRelationJson(jsonRelation: JSONViewJoinRelation, columnAliases: FieldColumnAliases, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONViewJoinRelation;
}
//# sourceMappingURL=Entity.d.ts.map