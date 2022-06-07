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
        uuId?: string
    },
    actor: {
        uuId?: string,
        user?: IUser
    },
    actorRecordId: number

}

export interface IRepositoryEntityUtils {

    getCreatedBy(
        idObject: RepositoryEntityId
    ): IUser

    encodeUuId(
        idObject: RepositoryEntityId
    ): string

    parseUuId(
        idString: string
    ): RepositoryEntityId

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

    encodeUuId(
        idObject: RepositoryEntityId
    ): string {
        if (!idObject.repository
            || !idObject.repository.uuId
            || !idObject.actor
            || !idObject.actor.uuId
            || !idObject.actorRecordId) {
            return null
        }
        if (typeof idObject.repository.uuId !== 'string') {
            throw Error(`Type of "repository.uuId" property is not a string.`)
        }
        if (typeof idObject.actor.uuId !== 'string') {
            throw Error(`Type of "actor.uuId" property is not a string.`)
        }
        if (typeof idObject.actorRecordId !== 'number') {
            throw Error(`Type of "actorRecordId" property is not a number.`)
        }
        return idObject.repository.uuId + '-' + idObject.actor.uuId + '-' + idObject.actorRecordId
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
