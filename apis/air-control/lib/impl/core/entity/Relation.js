import { DI } from '@airport/di';
import { JoinType } from '@airport/ground-control';
import { AIRPORT_DATABASE, RELATION_MANAGER, APPLICATION_UTILS } from '../../../tokens';
import { and } from '../operation/LogicalOperation';
/**
 * Created by Papa on 4/26/2016.
 */
export class QRelation {
    constructor(dbRelation, parentQ) {
        this.dbRelation = dbRelation;
        this.parentQ = parentQ;
    }
    innerJoin() {
        return this.getNewQEntity(JoinType.INNER_JOIN);
    }
    leftJoin() {
        return this.getNewQEntity(JoinType.LEFT_JOIN);
    }
    getNewQEntity(joinType) {
        const [airDb, relationManager, applicationUtils] = DI.db()
            .getSync(AIRPORT_DATABASE, RELATION_MANAGER, APPLICATION_UTILS);
        const dbEntity = this.dbRelation.relationEntity;
        const qEntityConstructor = applicationUtils.getQEntityConstructor(this.dbRelation.relationEntity, airDb);
        let newQEntity = new qEntityConstructor(dbEntity, relationManager.getNextChildJoinPosition(this.parentQ.__driver__), this.dbRelation, joinType);
        newQEntity.__driver__.parentJoinEntity = this.parentQ;
        return newQEntity;
    }
}
export class QRepositoryEntityRelation extends QRelation {
    equals(entity) {
        let thisRelation = this;
        let other = entity;
        return and(thisRelation.actor.id.equals(other.actor.id), thisRelation.actorRecordId.equals(other.actorRecordId), thisRelation.id.equals(other.repository.id));
    }
}
//# sourceMappingURL=Relation.js.map