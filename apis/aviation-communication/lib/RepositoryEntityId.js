var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
let RepositoryEntityUtils = class RepositoryEntityUtils {
    getCreatedBy(repositoryEntity) {
        return repositoryEntity.actor.user;
    }
    encodeUuId(idObject) {
        if (!idObject.repository
            || !idObject.repository.uuId
            || !idObject.actor
            || !idObject.actor.uuId
            || !idObject.actorRecordId) {
            return null;
        }
        if (typeof idObject.repository.uuId !== 'string') {
            throw Error(`Type of "repository.uuId" property is not a string.`);
        }
        if (typeof idObject.actor.uuId !== 'string') {
            throw Error(`Type of "actor.uuId" property is not a string.`);
        }
        if (typeof idObject.actorRecordId !== 'number') {
            throw Error(`Type of "actorRecordId" property is not a number.`);
        }
        return idObject.repository.uuId + '-' + idObject.actor.uuId + '-' + idObject.actorRecordId;
    }
    parseUuId(idString) {
        const idStringFragments = idString.split('-');
        if (idStringFragments.length !== 11) {
            throw new Error('Invalid Repository Entity Id, expecting {repositoryUuId}-{actorUuId}-{actorRecordId}');
        }
        const repositoryUuIdFragments = [];
        for (let i = 0; i < 5; i++) {
            repositoryUuIdFragments.push(idStringFragments[i]);
        }
        const actorUuIdFragments = [];
        for (let i = 5; i < 10; i++) {
            actorUuIdFragments.push(idStringFragments[i]);
        }
        return {
            repository: {
                uuId: repositoryUuIdFragments.join('-')
            },
            actor: {
                uuId: actorUuIdFragments.join('-')
            },
            actorRecordId: parseInt(idStringFragments[11])
        };
    }
    setUuId(idString, repositoryEntity) {
        let repositoryEntityId = this.parseUuId(idString);
        if (!repositoryEntity.repository) {
            repositoryEntity.repository = {
                uuId: repositoryEntityId.repository.uuId
            };
        }
        else {
            repositoryEntity.repository.uuId = repositoryEntityId.repository.uuId;
        }
        if (!repositoryEntity.actor) {
            repositoryEntity.actor = {
                uuId: repositoryEntityId.repository.uuId
            };
        }
        else {
            repositoryEntity.actor.uuId = repositoryEntityId.actor.uuId;
        }
        repositoryEntity.actorRecordId = repositoryEntityId.actorRecordId;
    }
};
RepositoryEntityUtils = __decorate([
    Injected()
], RepositoryEntityUtils);
export { RepositoryEntityUtils };
//# sourceMappingURL=RepositoryEntityId.js.map