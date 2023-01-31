import { IDependencyInjectionToken, InversionOfControl } from "@airport/direction-indicator"
import { DbEntity, DbRelation, JoinType, JSONBaseOperation, JSONEntityRelation, JSONJoinRelation, JSONRelation, JSONRelationType, Repository_GUID, Repository_LocalId } from "@airport/ground-control"
import { IFieldColumnAliases } from "../../../definition/core/entity/Aliases"
import { IFrom, IQEntity } from "../../../definition/core/entity/Entity"
import { IQEntityDriver, IQEntityInternal } from "../../../definition/core/entity/IQEntityDriver"
import { IRelationManager } from "../../../definition/core/entity/IRelationManager"
import { IJoinFields } from "../../../definition/core/entity/Joins"
import { IQInternalRelation } from "../../../definition/core/entity/Relation"
import { IQOperableFieldInternal } from "../../../definition/core/field/OperableField"
import { IEntityUtils } from "../../../definition/utils/IEntityUtils"
import { IFieldUtils } from "../../../definition/utils/IFieldUtils"
import { IQueryUtils } from "../../../definition/utils/IQueryUtils"
import { JoinFields } from "../Joins"

export class QEntityDriver<IQE extends IQEntity = any>
    implements IQEntityDriver<IQE> {

    childQEntities: IQEntityInternal[] = []
    entityFieldMap: { [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any> } = {}
    entityRelations: IQInternalRelation<any>[] = []
    entityRelationMapByIndex: { [relationPropertyIndex: number]: IQInternalRelation<any> }
    idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] = []
    allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] = []
    relations: IQInternalRelation<any>[] = []
    currentChildIndex = -1
    joinWhereClause: JSONBaseOperation
    parentJoinEntity: IQEntityInternal

    constructor(
        public dbEntity: DbEntity,
        private queryUtils: IQueryUtils,
        private relationManager: IRelationManager,
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

    addEntityField<T, IQF extends IQOperableFieldInternal<T, JSONBaseOperation, any, any>>(
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

    getRelationJson(
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IRelationManager
    ): JSONRelation {
        // FIXME: this does not work for non-entity tree queries, as there is not dbEntity
        // see ApplicationDao.findMaxVersionedMapByApplicationAndDomain_Names for an example
        let jsonRelation: JSONRelation = {
            currentChildIndex: this.currentChildIndex,
            ti: this.dbEntity.index,
            fromClausePosition: this.fromClausePosition,
            jt: this.joinType,
            rt: null,
            rep: columnAliases.entityAliases.getNextAlias(this.getRootJoinEntity()),
            si: this.dbEntity.applicationVersion.application.index
        }
        if (this.joinWhereClause) {
            this.getJoinRelationJson(<JSONJoinRelation>jsonRelation, columnAliases,
                trackedRepoGUIDSet, trackedRepoLocalIdSet,
                queryUtils, fieldUtils, relationManager)
        } else if (this.dbRelation) {
            this.getEntityRelationJson(<JSONEntityRelation>jsonRelation)
        } else {
            this.getRootRelationJson(jsonRelation, columnAliases,
                trackedRepoGUIDSet, trackedRepoLocalIdSet,
                queryUtils, fieldUtils, relationManager)
        }
        return jsonRelation
    }

    getJoinRelationJson(
        jsonRelation: JSONJoinRelation,
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IRelationManager
    ): JSONJoinRelation {
        jsonRelation.rt = JSONRelationType.ENTITY_JOIN_ON
        jsonRelation.joinWhereClause = queryUtils.whereClauseToJSON(
            this.joinWhereClause, columnAliases,
            trackedRepoGUIDSet, trackedRepoLocalIdSet)

        return jsonRelation
    }

    getEntityRelationJson(
        jsonRelation: JSONEntityRelation,
        // columnAliases: FieldColumnAliases,
        // queryUtils: IQueryUtils,
        // fieldUtils: IFieldUtils
    ): JSONEntityRelation {
        jsonRelation.rt = JSONRelationType.ENTITY_APPLICATION_RELATION
        jsonRelation.ri = this.dbRelation.index

        // if (!this.dbRelation.whereJoinTable) {
        return jsonRelation
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
        // mtoQEntity, this.airportDb, this.airportDb.F); jsonRelation.joinWhereClause    =
        // this.utils.Query.whereClauseToJSON(joinWhereClause, columnAliases);
        // jsonRelation.joinWhereClauseOperator   = this.dbRelation.joinFunctionWithOperator;  return
        // jsonRelation;
    }

    getRootRelationJson(
        jsonRelation: JSONRelation,
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IRelationManager
    ): JSONJoinRelation {
        jsonRelation.rt = (globalThis.IOC as InversionOfControl)
            .getSync(globalThis.ENTITY_UTILS as IDependencyInjectionToken<IEntityUtils>)
            // Removes circular dependency at code initialization time 
            .isQTree(this) ? JSONRelationType.SUB_QUERY_ROOT : JSONRelationType.ENTITY_ROOT

        return jsonRelation
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
                entityRelation.parentApplication_Index,
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

        const iEntity = ApplicationUtils.getIEntity(this.applicationIndex, this.tableIndex);
        this.oneToManyConfigMap = ApplicationUtils.getOneToManyConfigMap(iEntity);

        return this.oneToManyConfigMap;
    }
    */

}

globalThis.QEntityDriver = QEntityDriver
