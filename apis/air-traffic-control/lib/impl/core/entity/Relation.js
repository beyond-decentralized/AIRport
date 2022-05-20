import { parseId } from '@airport/aviation-communication';
import { JoinType } from '@airport/ground-control';
import { extend } from '../../utils/qApplicationBuilderUtils';
import { and } from '../operation/LogicalOperation';
/**
 * Created by Papa on 4/26/2016.
 */
/*
 * Cannot use 'class' syntax because it brakes dynamic creation of subclasses.
 * With 'class' browser reports:
 *   Class constructor QRelation cannot be invoked without 'new'
 * When calling:
 *   Q...Relation.base.constructor.call(this, relation, qEntity)
 */
export function QRelation(dbRelation, parentQ, applicationUtils, relationManager) {
    this.dbRelation = dbRelation;
    this.parentQ = parentQ;
    this.applicationUtils = applicationUtils;
    this.relationManager = relationManager;
}
QRelation.prototype.innerJoin = function () {
    return this.getNewQEntity(JoinType.INNER_JOIN);
};
QRelation.prototype.leftJoin = function () {
    return this.getNewQEntity(JoinType.LEFT_JOIN);
};
QRelation.prototype.getNewQEntity = function (joinType) {
    const dbEntity = this.dbRelation.relationEntity;
    const qEntityConstructor = this.applicationUtils.getQEntityConstructor(this.dbRelation.relationEntity);
    let newQEntity = new qEntityConstructor(dbEntity, this.applicationUtils, this.relationManager, this.relationManager.getNextChildJoinPosition(this.parentQ.__driver__), this.dbRelation, joinType, this.applicationUtils, this.relationManager);
    newQEntity.__driver__.parentJoinEntity = this.parentQ;
    return newQEntity;
};
export function QRepositoryEntityRelation(dbRelation, parentQ, applicationUtils, relationManager) {
    QRepositoryEntityRelation.base.constructor.call(this, dbRelation, parentQ, applicationUtils, relationManager);
}
QRepositoryEntityRelation.prototype.equals = function (entity) {
    if (typeof entity === 'string') {
        entity = parseId(entity);
    }
    let thisRelation = this;
    let other = entity;
    return and(thisRelation.actor.id.equals(other.actor.id), thisRelation.actorRecordId.equals(other.actorRecordId), thisRelation.id.equals(other.repository.id));
};
extend(QRelation, QRepositoryEntityRelation, {});
//# sourceMappingURL=Relation.js.map