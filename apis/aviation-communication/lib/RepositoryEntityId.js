export function parseId(idString) {
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
// FIXME: switch to UUID lookup for URLs to work across AIRport databases
export function encodeId(idObject) {
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
// FIXME: switch to UUID lookup for URLs to work across AIRport databases
export function setId(idString, repositoryEntity) {
    let repositoryEntityId = parseId(idString);
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
//# sourceMappingURL=RepositoryEntityId.js.map