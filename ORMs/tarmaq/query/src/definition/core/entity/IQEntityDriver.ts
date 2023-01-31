import { DbEntity, DbRelation, JoinType, JSONBaseOperation, JSONRelation, Repository_GUID, Repository_LocalId } from "@airport/ground-control";
import { IFieldUtils } from "../../utils/IFieldUtils";
import { IQueryUtils } from "../../utils/IQueryUtils";
import { IQOperableFieldInternal } from "../field/OperableField";
import { IFieldColumnAliases } from "./Aliases";
import { IFrom, IQEntity } from "./Entity";
import { IRelationManager } from "./IRelationManager";
import { IJoinFields } from "./Joins";
import { IQInternalRelation } from "./Relation";

export interface IQEntityInternal<QE extends IQEntity<any> = any>
    extends IQEntity<QE> {

    __driver__: IQEntityDriver<QE>;

}
export interface IQEntityDriver<QE extends IQEntity<any> = any> {

    allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    childQEntities: IQEntityInternal[]
    currentChildIndex: number;
    dbEntity: DbEntity;
    dbRelation: DbRelation;
    entityFieldMap: { [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any> };
    entityRelations: IQInternalRelation<any>[];
    fromClausePosition: number[];
    idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    joinType: JoinType;
    joinWhereClause: JSONBaseOperation;
    parentJoinEntity: IQEntityInternal;
    relations: IQInternalRelation<any>[];

    /*
    addEntityField<IQF extends IQOperableFieldInternal<any, JSONBaseOperation, any, any>>(
        field: IQF
    ): void;

    addEntityRelation<R extends IQEntityInternal>(
        relation: IQInternalRelation<R>
    ): void;
    */

    getInstance(): IQEntityInternal<QE>;

    getRelationJson(
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IRelationManager
    ): JSONRelation;

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
