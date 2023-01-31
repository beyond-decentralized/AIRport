import { DbEntity, DbRelation, JoinType, QueryBaseOperation, QueryRelation, Repository_GUID, Repository_LocalId } from "@airport/ground-control";
import { IFieldUtils } from "../../utils/IFieldUtils";
import { IQueryUtils } from "../../utils/IQueryUtils";
import { IQOperableFieldInternal } from "../field/IQOperableField";
import { IFieldColumnAliases } from "./IAliases";
import { IFrom, IQEntity } from "./IQEntity";
import { IQueryRelationManager } from "./IQueryRelationManager";
import { IJoinFields } from "./IJoins";
import { IQInternalRelation } from "./IQRelation";

export interface IQEntityInternal<QE extends IQEntity<any> = any>
    extends IQEntity<QE> {

    __driver__: IQEntityDriver<QE>;

}
export interface IQEntityDriver<QE extends IQEntity<any> = any> {

    allColumns: IQOperableFieldInternal<any, QueryBaseOperation, any, any>[];
    childQEntities: IQEntityInternal[]
    currentChildIndex: number;
    dbEntity: DbEntity;
    dbRelation: DbRelation;
    entityFieldMap: { [propertyName: string]: IQOperableFieldInternal<any, QueryBaseOperation, any, any> };
    entityRelations: IQInternalRelation<any>[];
    fromClausePosition: number[];
    idColumns: IQOperableFieldInternal<any, QueryBaseOperation, any, any>[];
    joinType: JoinType;
    joinWhereClause: QueryBaseOperation;
    parentJoinEntity: IQEntityInternal;
    relations: IQInternalRelation<any>[];

    /*
    addEntityField<IQF extends IQOperableFieldInternal<any, QueryBaseOperation, any, any>>(
        field: IQF
    ): void;

    addEntityRelation<R extends IQEntityInternal>(
        relation: IQInternalRelation<R>
    ): void;
    */

    getInstance(): IQEntityInternal<QE>;

    getQueryRelation(
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IQueryRelationManager
    ): QueryRelation;

    // getRelationPropertyName(): string;

    getRootJoinEntity(): IQEntityInternal;

    isRootEntity(): boolean;

    join<IF extends IFrom>(
        right: IF,
        joinType: JoinType,
    ): IJoinFields<IF, QE>;

    //getEntityRelationMap(): { [propertyName: string]: IQInternalRelation<any> };

    //getOneToManyConfigMap<IQE extends IQEntityInternal>(): { [name: string]:
    // OneToManyElements };
}
