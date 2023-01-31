import { IDependencyInjectionToken, InversionOfControl } from "@airport/direction-indicator"
import { DbEntity, DbRelation, JoinType, QueryBaseOperation, QueryEntityRelation, QueryJoinRelation, QueryRelation, QueryRelationType, Repository_GUID, Repository_LocalId } from "@airport/ground-control"
import { IFieldColumnAliases } from "../../../definition/core/entity/IAliases"
import { IFrom, IQEntity } from "../../../definition/core/entity/IQEntity"
import { IQEntityDriver, IQEntityInternal } from "../../../definition/core/entity/IQEntityDriver"
import { IQueryRelationManager } from "../../../definition/core/entity/IQueryRelationManager"
import { IJoinFields } from "../../../definition/core/entity/IJoins"
import { IQInternalRelation } from "../../../definition/core/entity/IQRelation"
import { IQOperableFieldInternal } from "../../../definition/core/field/IQOperableField"
import { IEntityUtils } from "../../../definition/utils/IEntityUtils"
import { IFieldUtils } from "../../../definition/utils/IFieldUtils"
import { IQueryUtils } from "../../../definition/utils/IQueryUtils"
import { JoinFields } from "../Joins"

export class QEntityDriver<IQE extends IQEntity = any>
    implements IQEntityDriver<IQE> {

    childQEntities: IQEntityInternal[] = []
    entityFieldMap: { [propertyName: string]: IQOperableFieldInternal<any, QueryBaseOperation, any, any> } = {}
    entityRelations: IQInternalRelation<any>[] = []
    entityRelationMapByIndex: { [relationPropertyIndex: number]: IQInternalRelation<any> }
    idColumns: IQOperableFieldInternal<any, QueryBaseOperation, any, any>[] = []
    allColumns: IQOperableFieldInternal<any, QueryBaseOperation, any, any>[] = []
    relations: IQInternalRelation<any>[] = []
    currentChildIndex = -1
    joinWhereClause: QueryBaseOperation
    parentJoinEntity: IQEntityInternal

    constructor(
        public dbEntity: DbEntity,
        private queryUtils: IQueryUtils,
        private relationManager: IQueryRelationManager,
        public fromClausePosition: number[] = [],
        public dbRelation: DbRelation = null,
        public joinType: JoinType = null,
        private qEntity: IQEntityInternal<IQE>
    ) {
    }

    getInstance(): IQEntityInternal<IQE> {
        const qEntityConstructor = this.queryUtils
            .getQEntityConstructor<IQE>(this.dbEntity)

        let instance: IQE & IQEntityInternal = new qEntityConstructor(this.dbEntity,
            this.queryUtils, this.relationManager,
            this.fromClausePosition, this.dbRelation, this.joinType) as any

        instance.__driver__.currentChildIndex = this.currentChildIndex
        instance.__driver__.joinWhereClause = this.joinWhereClause
        instance.__driver__.entityFieldMap = this.entityFieldMap
        instance.__driver__.entityRelations = this.entityRelations

        return instance
    }

    /*
    addEntityRelation<R extends IQEntityInternal>(
        relation: IQInternalRelation<R>
    ): void {
        this.entityRelations[relation.parentRelationIndex] = relation;
    }

    addEntityField<T, IQF extends IQOperableFieldInternal<T, QueryBaseOperation, any, any>>(
        field: IQF
    ): void {
        this.entityFieldMap[field.fieldName] = field;
    }
    */

    /*
    getRelationPropertyName(): string {
        return QMetadataUtils.getRelationPropertyName(QMetadataUtils.getRelationByIndex(this.qEntity, this.relationIndex));
    }
*/

    getQueryRelation(
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IQueryRelationManager
    ): QueryRelation {
        // FIXME: this does not work for non-entity tree queries, as there is not dbEntity
        // see ApplicationDao.findMaxVersionedMapByApplicationAndDomain_Names for an example
        let QueryRelation: QueryRelation = {
            currentChildIndex: this.currentChildIndex,
            entityIndex: this.dbEntity.index,
            fromClausePosition: this.fromClausePosition,
            joinType: this.joinType,
            relationType: null,
            rootEntityPrefix: columnAliases.entityAliases.getNextAlias(this.getRootJoinEntity()),
            applicationIndex: this.dbEntity.applicationVersion.application.index
        }
        if (this.joinWhereClause) {
            this.getJoinRelationQuery(<QueryJoinRelation>QueryRelation, columnAliases,
                trackedRepoGUIDSet, trackedRepoLocalIdSet,
                queryUtils, fieldUtils, relationManager)
        } else if (this.dbRelation) {
            this.getEntityRelationQuery(<QueryEntityRelation>QueryRelation)
        } else {
            this.getRootRelationQuery(QueryRelation, columnAliases,
                trackedRepoGUIDSet, trackedRepoLocalIdSet,
                queryUtils, fieldUtils, relationManager)
        }
        return QueryRelation
    }

    getJoinRelationQuery(
        QueryRelation: QueryJoinRelation,
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IQueryRelationManager
    ): QueryJoinRelation {
        QueryRelation.relationType = QueryRelationType.ENTITY_JOIN_ON
        QueryRelation.joinWhereClause = queryUtils.whereClauseToQueryOperation(
            this.joinWhereClause, columnAliases,
            trackedRepoGUIDSet, trackedRepoLocalIdSet)

        return QueryRelation
    }

    getEntityRelationQuery(
        QueryRelation: QueryEntityRelation,
        // columnAliases: FieldColumnAliases,
        // queryUtils: IQueryUtils,
        // fieldUtils: IFieldUtils
    ): QueryEntityRelation {
        QueryRelation.relationType = QueryRelationType.ENTITY_APPLICATION_RELATION
        QueryRelation.relationIndex = this.dbRelation.index

        // if (!this.dbRelation.whereJoinTable) {
        return QueryRelation
        // }
        // let otmQEntity;
        // let mtoQEntity;
        // switch (this.dbRelation.relationType) {
        // 	case EntityRelationType.ONE_TO_MANY:
        // 		mtoQEntity = this.qEntity;
        // 		otmQEntity = this.parentJoinEntity;
        // 		break;
        // 	case EntityRelationType.MANY_TO_ONE:
        // 		otmQEntity = this.qEntity;
        // 		mtoQEntity = this.parentJoinEntity;
        // 		break;
        // 	default:
        // 		throw new Error(`Unknown EntityRelationType: ${this.dbRelation.relationType}`);
        // }
        //
        // let joinWhereClause = this.dbRelation.whereJoinTable.addToJoinFunction(otmQEntity,
        // mtoQEntity, this.airportDb, this.airportDb.FROM); QueryRelation.joinWhereClause    =
        // this.utils.Query.whereClauseToQueryOperation(joinWhereClause, columnAliases);
        // QueryRelation.joinWhereClauseOperator   = this.dbRelation.joinFunctionWithOperator;  return
        // QueryRelation;
    }

    getRootRelationQuery(
        QueryRelation: QueryRelation,
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IQueryRelationManager
    ): QueryJoinRelation {
        QueryRelation.relationType = (globalThis.IOC as InversionOfControl)
            .getSync(globalThis.ENTITY_UTILS as IDependencyInjectionToken<IEntityUtils>)
            // Removes circular dependency at code initialization time 
            .isQTree(this) ? QueryRelationType.SUB_QUERY_ROOT : QueryRelationType.ENTITY_ROOT

        return QueryRelation
    }


    getQ(): IQEntityInternal {
        return this.qEntity
    }

    join<IF extends IFrom>(
        right: IF,
        joinType: JoinType,
    ): IJoinFields<IF, IQE> {
        let joinChild: IQEntityInternal = (<IQEntityInternal><any>right)
            .__driver__.getInstance()
        joinChild.__driver__.currentChildIndex = 0
        let nextChildPosition = this.relationManager.getNextChildJoinPosition(this)
        joinChild.__driver__.fromClausePosition = nextChildPosition
        joinChild.__driver__.joinType = joinType
        joinChild.__driver__.parentJoinEntity = this.qEntity
        this.qEntity.__driver__.childQEntities.push(joinChild)

        return new JoinFields<IF, IQE>(this.qEntity as any, joinChild as any)
    }

    isRootEntity(): boolean {
        return !this.parentJoinEntity
    }

    getRootJoinEntity(): IQEntityInternal {
        let rootEntity: IQEntityInternal = this.qEntity
        while (rootEntity.__driver__.parentJoinEntity) {
            rootEntity = rootEntity.__driver__.parentJoinEntity
        }
        return rootEntity
    }

    /*
    getEntityRelationMap(): { [propertyName: string]: IQInternalRelation<any> } {
        if (this.entityRelationMap) {
            return this.entityRelationMap;
        }
        this.entityRelationMap = {};

        for (const entityRelation of this.entityRelations) {
            const propertyName = ApplicationUtils.getIPropertyWithRelationIndex(
                entityRelation.parentDbApplication_Index,
                entityRelation.parentTableIndex,
                entityRelation.parentRelationIndex,
            ).name;
            this.entityRelationMap[propertyName] = entityRelation;
        }

        return this.entityRelationMap;
    }

    getOneToManyConfigMap<IQE extends IQEntityInternal>(): { [name: string]: OneToManyElements } {
        if (this.oneToManyConfigMap) {
            return this.oneToManyConfigMap;
        }

        const iEntity = ApplicationUtils.getIEntity(this.applicationIndex, this.entityIndex);
        this.oneToManyConfigMap = ApplicationUtils.getOneToManyConfigMap(iEntity);

        return this.oneToManyConfigMap;
    }
    */

}

globalThis.QEntityDriver = QEntityDriver
