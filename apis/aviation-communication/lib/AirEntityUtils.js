var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
let AirEntityUtils = class AirEntityUtils {
    getCreatedBy(airEntity) {
        return airEntity.actor.userAccount;
    }
    encodeId(idObject) {
        if (!idObject.repository
            || !idObject.repository.GUID
            || !idObject.actor
            || !idObject.actor.GUID
            || !idObject._actorRecordId) {
            return null;
        }
        if (typeof idObject.repository.GUID !== 'string') {
            throw Error(`Type of "repository.GUID" property is not a string.`);
        }
        if (typeof idObject.actor.GUID !== 'string') {
            throw Error(`Type of "actor.GUID" property is not a string.`);
        }
        if (typeof idObject._actorRecordId !== 'number') {
            throw Error(`Type of "_actorRecordId" property is not a number.`);
        }
        return idObject.repository.GUID + '-' + idObject.actor.GUID + '-' + idObject._actorRecordId;
    }
    parseEGUID(idString) {
        const idStringFragments = idString.split('-');
        if (idStringFragments.length !== 11) {
            throw new Error('Invalid Entity Id, expecting ${repository.GUID}-${actor.GUID}-${_actorRecordId}');
        }
        const repositoryGUIDFragments = [];
        for (let i = 0; i < 5; i++) {
            repositoryGUIDFragments.push(idStringFragments[i]);
        }
        const actorGUIDFragments = [];
        for (let i = 5; i < 10; i++) {
            actorGUIDFragments.push(idStringFragments[i]);
        }
        return {
            repository: {
                GUID: repositoryGUIDFragments.join('-')
            },
            actor: {
                GUID: actorGUIDFragments.join('-')
            },
            _actorRecordId: parseInt(idStringFragments[11])
        };
    }
    setId(idString, airEntity) {
        if (!idString) {
            return;
        }
        let airEntityId = this.parseEGUID(idString);
        if (!airEntity.repository) {
            airEntity.repository = {
                GUID: airEntityId.repository.GUID
            };
        }
        else {
            airEntity.repository.GUID = airEntityId.repository.GUID;
        }
        if (!airEntity.actor) {
            airEntity.actor = {
                GUID: airEntityId.repository.GUID
            };
        }
        else {
            airEntity.actor.GUID = airEntityId.actor.GUID;
        }
        airEntity._actorRecordId = airEntityId._actorRecordId;
    }
};
AirEntityUtils = __decorate([
    Injected()
], AirEntityUtils);
export { AirEntityUtils };
//# sourceMappingURL=AirEntityUtils.js.map