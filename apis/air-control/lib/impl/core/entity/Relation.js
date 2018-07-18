"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 4/26/2016.
 */
class QRelation {
    constructor(dbRelation, parentQ) {
        this.dbRelation = dbRelation;
        this.parentQ = parentQ;
    }
    static getPositionAlias(rootEntityPrefix, fromClausePosition) {
        return `${rootEntityPrefix}_${fromClausePosition.join('_')}`;
    }
    static getAlias(jsonRelation) {
        return this.getPositionAlias(jsonRelation.rep, jsonRelation.fcp);
    }
    static getParentAlias(jsonRelation) {
        let fromClausePosition = jsonRelation.fcp;
        if (fromClausePosition.length === 0) {
            throw `Cannot find alias of a parent entity for the root entity`;
        }
        return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1));
    }
    static createRelatedQEntity(utils, joinRelation) {
        const dbEntity = utils.Schema.getDbEntity(joinRelation.si, joinRelation.ti);
        let QEntityConstructor = utils.Schema.getQEntityConstructor(dbEntity);
        return new QEntityConstructor(dbEntity, joinRelation.fcp, dbEntity.relations[joinRelation.ri], joinRelation.jt);
    }
    static getNextChildJoinPosition(joinParentDriver) {
        let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice();
        nextChildJoinPosition.push(++joinParentDriver.currentChildIndex);
        return nextChildJoinPosition;
    }
    innerJoin() {
        return this.getNewQEntity(ground_control_1.JoinType.INNER_JOIN);
    }
    leftJoin() {
        return this.getNewQEntity(ground_control_1.JoinType.LEFT_JOIN);
    }
    getNewQEntity(joinType) {
        const dbEntity = this.dbRelation.property.entity;
        const utils = this.parentQ.__driver__.utils;
        const qEntityConstructor = utils.Schema.getQEntityConstructor(this.dbRelation.relationEntity);
        let newQEntity = new qEntityConstructor(dbEntity, QRelation.getNextChildJoinPosition(this.parentQ.__driver__), this.dbRelation, joinType);
        newQEntity.__driver__.parentJoinEntity = this.parentQ;
        return newQEntity;
    }
}
exports.QRelation = QRelation;
//# sourceMappingURL=Relation.js.map