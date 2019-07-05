"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 4/26/2016.
 */
function QRelation(dbRelation, parentQ) {
    this.dbRelation = dbRelation;
    this.parentQ = parentQ;
}
exports.QRelation = QRelation;
QRelation.getPositionAlias = function (rootEntityPrefix, fromClausePosition) {
    return `${rootEntityPrefix}_${fromClausePosition.join('_')}`;
};
QRelation.getAlias = function (jsonRelation) {
    return this.getPositionAlias(jsonRelation.rep, jsonRelation.fcp);
};
QRelation.getParentAlias = function (jsonRelation) {
    let fromClausePosition = jsonRelation.fcp;
    if (fromClausePosition.length === 0) {
        throw new Error(`Cannot find alias of a parent entity for the root entity`);
    }
    return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1));
};
QRelation.createRelatedQEntity = function (joinRelation, airDb, schemaUtils) {
    const dbEntity = schemaUtils.getDbEntity(joinRelation.si, joinRelation.ti, airDb);
    let QEntityConstructor = schemaUtils.getQEntityConstructor(dbEntity, airDb);
    return new QEntityConstructor(dbEntity, joinRelation.fcp, dbEntity.relations[joinRelation.ri], joinRelation.jt);
};
QRelation.getNextChildJoinPosition = function (joinParentDriver) {
    let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice();
    nextChildJoinPosition.push(++joinParentDriver.currentChildIndex);
    return nextChildJoinPosition;
};
QRelation.prototype.innerJoin = function () {
    return this.getNewQEntity(ground_control_1.JoinType.INNER_JOIN);
};
QRelation.prototype.leftJoin = function () {
    return this.getNewQEntity(ground_control_1.JoinType.LEFT_JOIN);
};
QRelation.prototype.getNewQEntity = function (joinType) {
    const dbEntity = this.dbRelation.property.entity;
    const utils = this.parentQ.__driver__.utils;
    const qEntityConstructor = utils.Schema.getQEntityConstructor(this.dbRelation.relationEntity);
    let newQEntity = new qEntityConstructor(dbEntity, QRelation.getNextChildJoinPosition(this.parentQ.__driver__), this.dbRelation, joinType);
    newQEntity.__driver__.parentJoinEntity = this.parentQ;
    return newQEntity;
};
//# sourceMappingURL=Relation.js.map