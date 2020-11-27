import { DI } from '@airport/di';
import { RELATION_MANAGER } from '../../../tokens';
export class RelationManager {
    getPositionAlias(rootEntityPrefix, fromClausePosition) {
        return `${rootEntityPrefix}_${fromClausePosition.join('_')}`;
    }
    getAlias(jsonRelation) {
        return this.getPositionAlias(jsonRelation.rep, jsonRelation.fcp);
    }
    getParentAlias(jsonRelation) {
        let fromClausePosition = jsonRelation.fcp;
        if (fromClausePosition.length === 0) {
            throw new Error(`Cannot find alias of a parent entity for the root entity`);
        }
        return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1));
    }
    createRelatedQEntity(joinRelation, context) {
        const dbEntity = context.ioc.schemaUtils.getDbEntity(joinRelation.si, joinRelation.ti, context.ioc.airDb);
        let QEntityConstructor = context.ioc.schemaUtils.getQEntityConstructor(dbEntity, context.ioc.airDb);
        return new QEntityConstructor(dbEntity, joinRelation.fcp, dbEntity.relations[joinRelation.ri], joinRelation.jt);
    }
    getNextChildJoinPosition(joinParentDriver) {
        let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice();
        nextChildJoinPosition.push(++joinParentDriver.currentChildIndex);
        return nextChildJoinPosition;
    }
}
DI.set(RELATION_MANAGER, RelationManager);
//# sourceMappingURL=RelationManager.js.map