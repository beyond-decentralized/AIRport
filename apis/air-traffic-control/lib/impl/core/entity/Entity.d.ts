import { DbEntity, DbRelation, JoinType, JSONBaseOperation, JSONEntityRelation, JSONJoinRelation, JSONRelation } from '@airport/ground-control';
import { IFieldColumnAliases } from '../../../lingo/core/entity/Aliases';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IFrom, IQEntity, IQEntityDriver, IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IJoinFields } from '../../../lingo/core/entity/Joins';
import { IQInternalRelation } from '../../../lingo/core/entity/Relation';
import { IQOperableFieldInternal } from '../../../lingo/core/field/OperableField';
import { IEntityDatabaseFacade } from '../../../lingo/core/repository/EntityDatabaseFacade';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils';
import type { IRelationManager } from './RelationManager';
/**
 * Created by Papa on 4/21/2016.
 */
export interface IQEntityInternalConstructor {
    entityConstructor: {
        new (...args: any[]): any;
    };
    applicationHash: string;
    entityIndex: number;
    new <IQE extends IQEntityInternal>(...args: any[]): IQE;
}
export declare namespace QEntity {
    function db<IEntity>(databaseName?: string): IEntityDatabaseFacade<IEntity, IEntitySelectProperties, IEntityCreateProperties, IEntityUpdateProperties, IEntityUpdateColumns, IEntityIdProperties, IEntityCascadeGraph, IQEntity>;
}
export interface QEntityConstructor {
    new <IQE extends IQEntityInternal>(dbEntity: DbEntity, applicationUtils: IApplicationUtils, relationManager: IRelationManager, fromClausePosition?: number[], dbRelation?: DbRelation, joinType?: JoinType, QDriver?: {
        new (...args: any[]): IQEntityDriver;
    }): IQE;
}
export declare function QEntity<IEntity>(dbEntity: DbEntity, applicationUtils: IApplicationUtils, relationManager: IRelationManager, fromClausePosition?: number[], dbRelation?: any, joinType?: JoinType, QDriver?: {
    new (...args: any[]): IQEntityDriver;
}): void;
export declare class QEntityDriver implements IQEntityDriver {
    dbEntity: DbEntity;
    private applicationUtils;
    private relationManager;
    fromClausePosition: number[];
    dbRelation: DbRelation;
    joinType: JoinType;
    private qEntity;
    childQEntities: IQEntityInternal[];
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
    constructor(dbEntity: DbEntity, applicationUtils: IApplicationUtils, relationManager: IRelationManager, fromClausePosition: number[], dbRelation: DbRelation, joinType: JoinType, qEntity: IQEntityInternal);
    getInstance(): IQEntityInternal;
    getRelationJson(columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONRelation;
    getJoinRelationJson(jsonRelation: JSONJoinRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONJoinRelation;
    getEntityRelationJson(jsonRelation: JSONEntityRelation): JSONEntityRelation;
    getRootRelationJson(jsonRelation: JSONRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONJoinRelation;
    getQ(): IQEntityInternal;
    join<IF extends IFrom>(right: IF, joinType: JoinType): IJoinFields<IF>;
    isRootEntity(): boolean;
    getRootJoinEntity(): IQEntityInternal;
}
//# sourceMappingURL=Entity.d.ts.map