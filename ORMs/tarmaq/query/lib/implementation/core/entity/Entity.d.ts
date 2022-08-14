import { DbEntity, DbRelation, JoinType, JSONBaseOperation, JSONEntityRelation, JSONJoinRelation, JSONRelation } from '@airport/ground-control';
import { IFieldColumnAliases } from '../../../definition/core/entity/Aliases';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IFrom, IQEntity, IQEntityDriver, IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IJoinFields } from '../../../definition/core/entity/Joins';
import { IQInternalRelation } from '../../../definition/core/entity/Relation';
import { IQOperableFieldInternal } from '../../../definition/core/field/OperableField';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { IApplicationUtils } from '../../../definition/utils/IApplicationUtils';
import { IEntityQueryDatabaseFacade } from '../../../definition/core/IEntityQueryDatabaseFacade';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
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
    function db<IEntity>(databaseName?: string): IEntityQueryDatabaseFacade<IEntity, IEntitySelectProperties, IEntityCreateProperties, IEntityUpdateProperties, IEntityUpdateColumns, IEntityIdProperties, IEntityCascadeGraph, IQEntity>;
}
export interface QEntityConstructor<IQE extends IQEntity> {
    new (dbEntity: DbEntity, applicationUtils: IApplicationUtils, relationManager: IRelationManager, fromClausePosition?: number[], dbRelation?: DbRelation, joinType?: JoinType, QDriver?: {
        new (...args: any[]): IQEntityDriver<IQE>;
    }): IQE;
}
export declare function QEntity<IEntity, IQE extends IQEntity>(dbEntity: DbEntity, applicationUtils: IApplicationUtils, relationManager: IRelationManager, fromClausePosition?: number[], dbRelation?: any, joinType?: JoinType, QDriver?: {
    new (...args: any[]): IQEntityDriver<IQE>;
}): void;
export declare class QEntityDriver<IQE extends IQEntity = any> implements IQEntityDriver<IQE> {
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
    constructor(dbEntity: DbEntity, applicationUtils: IApplicationUtils, relationManager: IRelationManager, fromClausePosition: number[], dbRelation: DbRelation, joinType: JoinType, qEntity: IQEntityInternal<IQE>);
    getInstance(): IQEntityInternal<IQE>;
    getRelationJson(columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONRelation;
    getJoinRelationJson(jsonRelation: JSONJoinRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONJoinRelation;
    getEntityRelationJson(jsonRelation: JSONEntityRelation): JSONEntityRelation;
    getRootRelationJson(jsonRelation: JSONRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONJoinRelation;
    getQ(): IQEntityInternal;
    join<IF extends IFrom>(right: IF, joinType: JoinType): IJoinFields<IF, IQE>;
    isRootEntity(): boolean;
    getRootJoinEntity(): IQEntityInternal;
}
//# sourceMappingURL=Entity.d.ts.map