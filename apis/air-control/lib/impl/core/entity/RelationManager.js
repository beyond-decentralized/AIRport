export class RelationManager {
    getPositionAlias(rootEntityPrefix, fromClausePosition) {
        return `${rootEntityPrefix}_${fromClausePosition.join('_')}`;
    }
    getAlias(jsonRelation) {
        return this.getPositionAlias(jsonRelation.rep, jsonRelation.fromClausePosition);
    }
    getParentAlias(jsonRelation) {
        let fromClausePosition = jsonRelation.fromClausePosition;
        if (fromClausePosition.length === 0) {
            throw new Error(`Cannot find alias of a parent entity for the root entity`);
        }
        return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1));
    }
    createRelatedQEntity(joinRelation, context) {
        const dbEntity = this.applicationUtils.getDbEntity(joinRelation.si, joinRelation.ti);
        let QEntityConstructor = this.applicationUtils.getQEntityConstructor(dbEntity);
        return new QEntityConstructor(dbEntity, joinRelation.fromClausePosition, dbEntity.relations[joinRelation.ri], joinRelation.jt);
    }
    getNextChildJoinPosition(joinParentDriver) {
        let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice();
        nextChildJoinPosition.push(++joinParentDriver.currentChildIndex);
        return nextChildJoinPosition;
    }
}
//# sourceMappingURL=RelationManager.js.map