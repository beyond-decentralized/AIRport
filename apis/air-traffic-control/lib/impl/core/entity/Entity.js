import { IOC } from '@airport/direction-indicator';
import { JoinType, JSONRelationType } from '@airport/ground-control';
import { TreeQuery } from '../../query/facade/TreeQuery';
import { extend } from '../../utils/qApplicationBuilderUtils';
import { JoinFields } from '../Joins';
import { QUERY_UTILS } from '../../../tokens';
export function QEntity(dbEntity, applicationUtils, relationManager, fromClausePosition = [], dbRelation = null, joinType = null, QDriver = QEntityDriver) {
    this.__driver__ = new QDriver(dbEntity, applicationUtils, relationManager, fromClausePosition, dbRelation, joinType, this);
}
QEntity.prototype.fullJoin = function (right) {
    return this.__driver__.join(right, JoinType.FULL_JOIN);
};
QEntity.prototype.innerJoin = function (right) {
    return this.__driver__.join(right, JoinType.INNER_JOIN);
};
QEntity.prototype.leftJoin = function (right) {
    return this.__driver__.join(right, JoinType.LEFT_JOIN);
};
QEntity.prototype.rightJoin = function (right) {
    return this.__driver__.join(right, JoinType.RIGHT_JOIN);
};
QEntity.prototype.equals = function (entity) {
    return IOC.getSync(QUERY_UTILS).equals(entity, this);
};
export class QEntityDriver {
    constructor(dbEntity, applicationUtils, relationManager, fromClausePosition = [], dbRelation = null, joinType = null, qEntity) {
        this.dbEntity = dbEntity;
        this.applicationUtils = applicationUtils;
        this.relationManager = relationManager;
        this.fromClausePosition = fromClausePosition;
        this.dbRelation = dbRelation;
        this.joinType = joinType;
        this.qEntity = qEntity;
        this.entityFieldMap = {};
        this.entityRelations = [];
        this.idColumns = [];
        this.allColumns = [];
        this.relations = [];
        this.currentChildIndex = -1;
    }
    getInstance() {
        const qEntityConstructor = this.applicationUtils
            .getQEntityConstructor(this.dbEntity);
        let instance = new qEntityConstructor(this.dbEntity, this.applicationUtils, this.relationManager, this.fromClausePosition, this.dbRelation, this.joinType);
        instance.__driver__.currentChildIndex = this.currentChildIndex;
        instance.__driver__.joinWhereClause = this.joinWhereClause;
        instance.__driver__.entityFieldMap = this.entityFieldMap;
        instance.__driver__.entityRelations = this.entityRelations;
        return instance;
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
    getRelationJson(columnAliases, queryUtils, fieldUtils, relationManager) {
        // FIXME: this does not work for non-entity tree queries, as there is not dbEntity
        // see ApplicationDao.findMaxVersionedMapByApplicationAndDomainNames for an example
        let jsonRelation = {
            currentChildIndex: this.currentChildIndex,
            ti: this.dbEntity.index,
            fromClausePosition: this.fromClausePosition,
            jt: this.joinType,
            rt: null,
            rep: columnAliases.entityAliases.getNextAlias(this.getRootJoinEntity()),
            si: this.dbEntity.applicationVersion.application.index
        };
        if (this.joinWhereClause) {
            this.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        }
        else if (this.dbRelation) {
            this.getEntityRelationJson(jsonRelation);
        }
        else {
            this.getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        }
        return jsonRelation;
    }
    getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation.rt = JSONRelationType.ENTITY_JOIN_ON;
        jsonRelation.joinWhereClause = queryUtils.whereClauseToJSON(this.joinWhereClause, columnAliases);
        return jsonRelation;
    }
    getEntityRelationJson(jsonRelation) {
        jsonRelation.rt = JSONRelationType.ENTITY_APPLICATION_RELATION;
        jsonRelation.ri = this.dbRelation.index;
        // if (!this.dbRelation.whereJoinTable) {
        return jsonRelation;
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
    getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation.rt = (this instanceof QTreeDriver) ? JSONRelationType.SUB_QUERY_ROOT : JSONRelationType.ENTITY_ROOT;
        return jsonRelation;
    }
    getQ() {
        return this.qEntity;
    }
    join(right, joinType) {
        let joinChild = right
            .__driver__.getInstance();
        joinChild.__driver__.currentChildIndex = 0;
        let nextChildPosition = this.relationManager.getNextChildJoinPosition(this);
        joinChild.__driver__.fromClausePosition = nextChildPosition;
        joinChild.__driver__.joinType = joinType;
        joinChild.__driver__.parentJoinEntity = this.qEntity;
        return new JoinFields(joinChild);
    }
    isRootEntity() {
        return !this.parentJoinEntity;
    }
    getRootJoinEntity() {
        let rootEntity = this.qEntity;
        while (rootEntity.__driver__.parentJoinEntity) {
            rootEntity = rootEntity.__driver__.parentJoinEntity;
        }
        return rootEntity;
    }
}
export function QTree(fromClausePosition = [], subQuery) {
    QTree.base.constructor.call(this, null, fromClausePosition, null, null, QTreeDriver);
    this.__driver__.subQuery = subQuery;
}
const qTreeMethods = {
/*
yourMethodName: function() {},
*/
};
extend(QEntity, QTree, qTreeMethods);
export class QTreeDriver extends QEntityDriver {
    getInstance() {
        let instance = super.getInstance();
        instance.__driver__
            .subQuery = this.subQuery;
        return instance;
    }
    // getRelationPropertyName(): string {
    // 	throw new Error(`not implemented`);
    // }
    getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        jsonRelation.rt = JSONRelationType.SUB_QUERY_JOIN_ON;
        jsonRelation.subQuery = new TreeQuery(this.subQuery, columnAliases.entityAliases)
            .toJSON(queryUtils, fieldUtils, relationManager);
        return jsonRelation;
    }
    getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        jsonRelation.rt = JSONRelationType.SUB_QUERY_ROOT;
        jsonRelation.subQuery = new TreeQuery(this.subQuery, columnAliases.entityAliases)
            .toJSON(queryUtils, fieldUtils, relationManager);
        return jsonRelation;
    }
}
//# sourceMappingURL=Entity.js.map