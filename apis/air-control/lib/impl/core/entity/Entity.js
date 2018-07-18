"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const TreeQuery_1 = require("../../query/facade/TreeQuery");
const Joins_1 = require("../Joins");
const Relation_1 = require("./Relation");
class QEntity {
    constructor(dbEntity, fromClausePosition = [], dbRelation = null, joinType = null, QDriver = QEntityDriver) {
        this.__driver__ = new QDriver(dbEntity, fromClausePosition, dbRelation, joinType, this);
    }
    fullJoin(right) {
        return this.__driver__.join(right, ground_control_1.JoinType.FULL_JOIN);
    }
    innerJoin(right) {
        return this.__driver__.join(right, ground_control_1.JoinType.INNER_JOIN);
    }
    leftJoin(right) {
        return this.__driver__.join(right, ground_control_1.JoinType.LEFT_JOIN);
    }
    rightJoin(right) {
        return this.__driver__.join(right, ground_control_1.JoinType.RIGHT_JOIN);
    }
}
exports.QEntity = QEntity;
class QEntityDriver {
    constructor(dbEntity, fromClausePosition = [], dbRelation = null, joinType = null, qEntity) {
        this.dbEntity = dbEntity;
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
        const qEntityConstructor = this.qEntity.__driver__.utils.Schema
            .getQEntityConstructor(this.dbEntity);
        let instance = new qEntityConstructor(this.dbEntity, this.fromClausePosition, this.dbRelation, this.joinType);
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
    getRelationJson(columnAliases) {
        let jsonRelation = {
            cci: this.currentChildIndex,
            ti: this.dbEntity.index,
            fcp: this.fromClausePosition,
            jt: this.joinType,
            rt: null,
            rep: columnAliases.entityAliases.getNextAlias(this.getRootJoinEntity()),
            si: this.dbEntity.schemaVersion.id
        };
        if (this.joinWhereClause) {
            this.getJoinRelationJson(jsonRelation, columnAliases);
        }
        else if (this.dbRelation) {
            this.getEntityRelationJson(jsonRelation, columnAliases);
        }
        else {
            this.getRootRelationJson(jsonRelation, columnAliases);
        }
        return jsonRelation;
    }
    getJoinRelationJson(jsonRelation, columnAliases) {
        jsonRelation.rt = ground_control_1.JSONRelationType.ENTITY_JOIN_ON;
        jsonRelation.jwc = this.utils.Query.whereClauseToJSON(this.joinWhereClause, columnAliases);
        return jsonRelation;
    }
    getEntityRelationJson(jsonRelation, columnAliases) {
        jsonRelation.rt = ground_control_1.JSONRelationType.ENTITY_SCHEMA_RELATION;
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
        // 		throw `Unknown EntityRelationType: ${this.dbRelation.relationType}`;
        // }
        //
        // let joinWhereClause = this.dbRelation.whereJoinTable.addToJoinFunction(otmQEntity, mtoQEntity, this.airportDb, this.airportDb.F);
        // jsonRelation.jwc    = this.utils.Query.whereClauseToJSON(joinWhereClause, columnAliases);
        // jsonRelation.wjto   = this.dbRelation.joinFunctionWithOperator;
        //
        // return jsonRelation;
    }
    getRootRelationJson(jsonRelation, columnAliases) {
        jsonRelation.rt = (this instanceof QTreeDriver) ? ground_control_1.JSONRelationType.SUB_QUERY_ROOT : ground_control_1.JSONRelationType.ENTITY_ROOT;
        return jsonRelation;
    }
    getQ() {
        return this.qEntity;
    }
    join(right, joinType) {
        let joinChild = right.__driver__.getInstance();
        joinChild.__driver__.currentChildIndex = 0;
        let nextChildPosition = Relation_1.QRelation.getNextChildJoinPosition(this);
        joinChild.__driver__.fromClausePosition = nextChildPosition;
        joinChild.__driver__.joinType = joinType;
        joinChild.__driver__.parentJoinEntity = this.qEntity;
        return new Joins_1.JoinFields(joinChild);
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
exports.QEntityDriver = QEntityDriver;
class QTree extends QEntity {
    constructor(fromClausePosition = [], subQuery) {
        super(null, fromClausePosition, null, null, QTreeDriver);
        this.__driver__.subQuery = subQuery;
    }
}
exports.QTree = QTree;
class QTreeDriver extends QEntityDriver {
    getInstance() {
        let instance = super.getInstance();
        instance.__driver__.subQuery = this.subQuery;
        return instance;
    }
    // getRelationPropertyName(): string {
    // 	throw `not imlemented`;
    // }
    getJoinRelationJson(jsonRelation, columnAliases) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases);
        jsonRelation.rt = ground_control_1.JSONRelationType.SUB_QUERY_JOIN_ON;
        jsonRelation.sq = new TreeQuery_1.TreeQuery(this.subQuery, this.utils, columnAliases.entityAliases).toJSON();
        return jsonRelation;
    }
    getRootRelationJson(jsonRelation, columnAliases) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases);
        jsonRelation.rt = ground_control_1.JSONRelationType.SUB_QUERY_ROOT;
        jsonRelation.sq = new TreeQuery_1.TreeQuery(this.subQuery, this.utils, columnAliases.entityAliases).toJSON();
        return jsonRelation;
    }
}
exports.QTreeDriver = QTreeDriver;
//# sourceMappingURL=Entity.js.map