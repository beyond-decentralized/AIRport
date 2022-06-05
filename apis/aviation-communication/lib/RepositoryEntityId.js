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
    encodeId(idObject) {
        if (!idObject.repository) {
            throw Error(`Id object does not have a "repository" member object.`);
        }
        if (!idObject.repository.id) {
            throw Error(`Id object does not have a "repository.id" property.`);
        }
        if (typeof idObject.repository.id !== 'number') {
            throw Error(`Type of "repository.id" property is not a number.`);
        }
        if (!idObject.actor) {
            throw Error(`Id object does not have an "actor" member object.`);
        }
        if (!idObject.actor.id) {
            throw Error(`Id object does not have an "actor.id" property.`);
        }
        if (typeof idObject.actor.id !== 'number') {
            throw Error(`Type of "actor.id" property is not a number.`);
        }
        if (!idObject.actorRecordId) {
            throw Error(`Id object does not have an "actorRecordId" property.`);
        }
        if (typeof idObject.actorRecordId !== 'number') {
            throw Error(`Type of "actorRecordId" property is not a number.`);
        }
        return idObject.repository.id + '-' + idObject.actor.id + '-' + idObject.actorRecordId;
    }
    encodeUuId(idObject) {
        if (!idObject.repository) {
            throw Error(`Id object does not have a "repository" member object.`);
        }
        if (!idObject.repository.uuId) {
            throw Error(`Id object does not have a "repository.id" property.`);
        }
        if (typeof idObject.repository.uuId !== 'string') {
            throw Error(`Type of "repository.uuId" property is not a string.`);
        }
        if (!idObject.actor) {
            throw Error(`Id object does not have an "actor" member object.`);
        }
        if (!idObject.actor.uuId) {
            throw Error(`Id object does not have an "actor.uuId" property.`);
        }
        if (typeof idObject.actor.uuId !== 'number') {
            throw Error(`Type of "actor.uuId" property is not a string.`);
        }
        if (!idObject.actorRecordId) {
            throw Error(`Id object does not have an "actorRecordId" property.`);
        }
        if (typeof idObject.actorRecordId !== 'number') {
            throw Error(`Type of "actorRecordId" property is not a number.`);
        }
        return idObject.repository.uuId + '-' + idObject.actor.uuId + '-' + idObject.actorRecordId;
    }
    parseId(idString) {
        const idStringFragments = idString.split('-');
        if (idStringFragments.length !== 3) {
            throw new Error('Invalid Repository Entity Id, expecting {repositoryId}-{actorId}-{actorRecordId}');
        }
        return {
            repository: {
                id: parseInt(idStringFragments[0])
            },
            actor: {
                id: parseInt(idStringFragments[1])
            },
            actorRecordId: parseInt(idStringFragments[2])
        };
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
    setId(idString, repositoryEntity) {
        let repositoryEntityId = this.parseId(idString);
        if (!repositoryEntity.repository) {
            repositoryEntity.repository = {
                id: repositoryEntityId.repository.id
            };
        }
        else {
            repositoryEntity.repository.id = repositoryEntityId.repository.id;
        }
        if (!repositoryEntity.actor) {
            repositoryEntity.actor = {
                id: repositoryEntityId.repository.id
            };
        }
        else {
            repositoryEntity.actor.id = repositoryEntityId.actor.id;
        }
        repositoryEntity.actorRecordId = repositoryEntityId.actorRecordId;
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