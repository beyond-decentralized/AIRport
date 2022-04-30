var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let RelationManager = class RelationManager {
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
        return new QEntityConstructor(dbEntity, this.applicationUtils, this, joinRelation.fromClausePosition, dbEntity.relations[joinRelation.ri], joinRelation.jt);
    }
    getNextChildJoinPosition(joinParentDriver) {
        let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice();
        nextChildJoinPosition.push(++joinParentDriver.currentChildIndex);
        return nextChildJoinPosition;
    }
};
__decorate([
    Inject()
], RelationManager.prototype, "applicationUtils", void 0);
RelationManager = __decorate([
    Injected()
], RelationManager);
export { RelationManager };
//# sourceMappingURL=RelationManager.js.map