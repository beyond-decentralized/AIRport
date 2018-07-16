import { DbEntity, DbRelation, JoinType, JSONBaseOperation, JSONEntityRelation, JSONJoinRelation, JSONRelation, JSONViewJoinRelation } from "@airport/ground-control";
import { IEntityUpdateColumns, IQOperableFieldInternal, IUtils } from "../../../";
import { IAirportDatabase } from "../../../lingo/AirportDatabase";
import { IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IFrom, IQEntity, IQEntityDriver, IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { IJoinFields } from "../../../lingo/core/entity/Joins";
import { IQInternalRelation } from "../../../lingo/core/entity/Relation";
import { IEntityDatabaseFacade } from "../../../lingo/core/repository/EntityDatabaseFacade";
import { RawTreeQuery } from "../../../lingo/query/facade/TreeQuery";
import { FieldColumnAliases } from "./Aliases";
/**
 * Created by Papa on 4/21/2016.
 */
export interface IQEntityInternalConstructor {
    entityConstructor: {
        new (...args: any[]): any;
    };
    schemaHash: string;
    entityIndex: number;
    new <IQE extends IQEntityInternal>(...args: any[]): IQE;
}
export declare namespace QEntity {
    function db<IEntity>(databaseName?: string): IEntityDatabaseFacade<IEntity, IEntitySelectProperties, IEntityCreateProperties, IEntityUpdateProperties, IEntityUpdateColumns, IEntityIdProperties, IQEntity>;
}
export interface QEntityConstructor {
    new <IQE extends IQEntityInternal>(dbEntity: DbEntity, fromClausePosition?: number[], dbRelation?: DbRelation, joinType?: JoinType, QDriver?: {
        new (...args: any[]): IQEntityDriver;
    }): IQE;
}
export declare class QEntity implements IQEntityInternal {
    __driver__: IQEntityDriver;
    constructor(dbEntity: DbEntity, fromClausePosition?: number[], dbRelation?: any, joinType?: JoinType, QDriver?: {
        new (...args: any[]): IQEntityDriver;
    });
    fullJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;
    innerJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;
    leftJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;
    rightJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;
}
export declare class QEntityDriver implements IQEntityDriver {
    dbEntity: DbEntity;
    fromClausePosition: number[];
    dbRelation: DbRelation;
    joinType: JoinType;
    private qEntity;
    utils: IUtils;
    airportDb: IAirportDatabase;
    entityFieldMap: {
        [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any>;
    };
    entityRelations: IQInternalRelation<any>[];
    entityRelationMapByIndex: {
        [relationPropertyIndex: number]: IQInternalRelation<any>;
    };
    idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    relations: IQInternalRelation<any>[];
    currentChildIndex: number;
    joinWhereClause: JSONBaseOperation;
    parentJoinEntity: IQEntityInternal;
    private entityRelationMap;
    private oneToManyConfigMap;
    constructor(dbEntity: DbEntity, fromClausePosition: number[], dbRelation: DbRelation, joinType: JoinType, qEntity: IQEntityInternal);
    getInstance(): IQEntityInternal;
    getRelationJson(columnAliases: FieldColumnAliases): JSONRelation;
    getJoinRelationJson(jsonRelation: JSONJoinRelation, columnAliases: FieldColumnAliases): JSONJoinRelation;
    getEntityRelationJson(jsonRelation: JSONEntityRelation, columnAliases: FieldColumnAliases): JSONEntityRelation;
    getRootRelationJson(jsonRelation: JSONRelation, columnAliases: FieldColumnAliases): JSONJoinRelation;
    getQ(): IQEntityInternal;
    join<IF extends IFrom>(right: IF, joinType: JoinType): IJoinFields<IF>;
    isRootEntity(): boolean;
    getRootJoinEntity(): IQEntityInternal;
}
export declare class QTree extends QEntity {
    __driver__: IQTreeDriver;
    constructor(fromClausePosition: number[], subQuery: RawTreeQuery<any>);
}
export interface IQTreeDriver extends IQEntityDriver {
    subQuery: RawTreeQuery<any>;
}
export declare class QTreeDriver extends QEntityDriver implements IQTreeDriver {
    subQuery: RawTreeQuery<any>;
    getInstance(): QTree;
    getJoinRelationJson(jsonRelation: JSONViewJoinRelation, columnAliases: FieldColumnAliases): JSONViewJoinRelation;
    getRootRelationJson(jsonRelation: JSONViewJoinRelation, columnAliases: FieldColumnAliases): JSONViewJoinRelation;
}
