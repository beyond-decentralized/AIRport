import { Injected } from '@airport/direction-indicator'


export interface IUser {

    // Id Properties
    id: number;

    // Id Relations

    // Non-Id Properties
    email?: string;
    passwordHash?: string;
    ranking?: number;
    username?: string;
    uuId?: string;

    // Non-Id Relations

    // Transient Properties

    // Public Methods

}

export interface RepositoryEntityId {

    repository: {
        id?: number
        uuId?: string
    },
    actor: {
        id?: number
        uuId?: string,
        user?: IUser
    },
    actorRecordId: number

}

export interface IRepositoryEntityUtils {

    getCreatedBy(
        idObject: RepositoryEntityId
    ): IUser

    encodeId(
        idObject: RepositoryEntityId
    ): string

    encodeUuId(
        idObject: RepositoryEntityId
    ): string

    parseId(
        idString: string
    ): RepositoryEntityId

    parseUuId(
        idString: string
    ): RepositoryEntityId

    setId(
        idString: string,
        repositoryEntity: RepositoryEntityId
    ): void

    setUuId(
        idString: string,
        repositoryEntity: RepositoryEntityId
    ): void

}

@Injected()
export class RepositoryEntityUtils
    implements IRepositoryEntityUtils {

    getCreatedBy(
        repositoryEntity: RepositoryEntityId
    ): IUser {
        return repositoryEntity.actor.user
    }

    encodeId(
        idObject: RepositoryEntityId
    ): string {
        if (!idObject.repository) {
            throw Error(`Id object does not have a "repository" member object.`)
        }
        if (!idObject.repository.id) {
            throw Error(`Id object does not have a "repository.id" property.`)
        }
        if (typeof idObject.repository.id !== 'number') {
            throw Error(`Type of "repository.id" property is not a number.`)
        }
        if (!idObject.actor) {
            throw Error(`Id object does not have an "actor" member object.`)
        }
        if (!idObject.actor.id) {
            throw Error(`Id object does not have an "actor.id" property.`)
        }
        if (typeof idObject.actor.id !== 'number') {
            throw Error(`Type of "actor.id" property is not a number.`)
        }
        if (!idObject.actorRecordId) {
            throw Error(`Id object does not have an "actorRecordId" property.`)
        }
        if (typeof idObject.actorRecordId !== 'number') {
            throw Error(`Type of "actorRecordId" property is not a number.`)
        }
        return idObject.repository.id + '-' + idObject.actor.id + '-' + idObject.actorRecordId
    }

    encodeUuId(
        idObject: RepositoryEntityId
    ): string {
        if (!idObject.repository) {
            throw Error(`Id object does not have a "repository" member object.`)
        }
        if (!idObject.repository.uuId) {
            throw Error(`Id object does not have a "repository.id" property.`)
        }
        if (typeof idObject.repository.uuId !== 'string') {
            throw Error(`Type of "repository.uuId" property is not a string.`)
        }
        if (!idObject.actor) {
            throw Error(`Id object does not have an "actor" member object.`)
        }
        if (!idObject.actor.uuId) {
            throw Error(`Id object does not have an "actor.uuId" property.`)
        }
        if (typeof idObject.actor.uuId !== 'number') {
            throw Error(`Type of "actor.uuId" property is not a string.`)
        }
        if (!idObject.actorRecordId) {
            throw Error(`Id object does not have an "actorRecordId" property.`)
        }
        if (typeof idObject.actorRecordId !== 'number') {
            throw Error(`Type of "actorRecordId" property is not a number.`)
        }
        return idObject.repository.uuId + '-' + idObject.actor.uuId + '-' + idObject.actorRecordId
    }

    parseId(
        idString: string
    ): RepositoryEntityId {
        const idStringFragments = idString.split('-')
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
        }
    }

    parseUuId(
        idString: string
    ): RepositoryEntityId {
        const idStringFragments = idString.split('-')
        if (idStringFragments.length !== 11) {
            throw new Error('Invalid Repository Entity Id, expecting {repositoryUuId}-{actorUuId}-{actorRecordId}');
        }
        const repositoryUuIdFragments: string[] = []
        for (let i = 0; i < 5; i++) {
            repositoryUuIdFragments.push(idStringFragments[i])
        }
        const actorUuIdFragments: string[] = []
        for (let i = 5; i < 10; i++) {
            actorUuIdFragments.push(idStringFragments[i])
        }
        return {
            repository: {
                uuId: repositoryUuIdFragments.join('-')
            },
            actor: {
                uuId: actorUuIdFragments.join('-')
            },
            actorRecordId: parseInt(idStringFragments[11])
        }
    }

    setId(
        idString: string,
        repositoryEntity: RepositoryEntityId
    ): void {
        let repositoryEntityId = this.parseId(idString)
        if (!repositoryEntity.repository) {
            repositoryEntity.repository = {
                id: repositoryEntityId.repository.id
            }
        } else {
            repositoryEntity.repository.id = repositoryEntityId.repository.id
        }

        if (!repositoryEntity.actor) {
            repositoryEntity.actor = {
                id: repositoryEntityId.repository.id
            }
        } else {
            repositoryEntity.actor.id = repositoryEntityId.actor.id
        }

        repositoryEntity.actorRecordId = repositoryEntityId.actorRecordId
    }

    setUuId(
        idString: string,
        repositoryEntity: RepositoryEntityId
    ): void {
        let repositoryEntityId = this.parseUuId(idString)
        if (!repositoryEntity.repository) {
            repositoryEntity.repository = {
                uuId: repositoryEntityId.repository.uuId
            }
        } else {
            repositoryEntity.repository.uuId = repositoryEntityId.repository.uuId
        }

        if (!repositoryEntity.actor) {
            repositoryEntity.actor = {
                uuId: repositoryEntityId.repository.uuId
            }
        } else {
            repositoryEntity.actor.uuId = repositoryEntityId.actor.uuId
        }

        repositoryEntity.actorRecordId = repositoryEntityId.actorRecordId
    }

}
