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

export interface AirEntityUuId {

    repository: {
        uuId?: string
    },
    actor: {
        uuId?: string,
        user?: IUser
    },
    actorRecordId: number

}

export interface IAirEntityUtils {

    getCreatedBy(
        idObject: AirEntityUuId
    ): IUser

    encodeUuId(
        idObject: AirEntityUuId
    ): string

    parseUuId(
        idString: string
    ): AirEntityUuId

    setUuId(
        idString: string,
        airEntity: AirEntityUuId
    ): void

}

@Injected()
export class AirEntityUtils
    implements IAirEntityUtils {

    getCreatedBy(
        airEntity: AirEntityUuId
    ): IUser {
        return airEntity.actor.user
    }

    encodeUuId(
        idObject: AirEntityUuId
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
    ): AirEntityUuId {
        const idStringFragments = idString.split('-')
        if (idStringFragments.length !== 11) {
            throw new Error('Invalid AirEntity UuId, expecting {repositoryUuId}-{actorUuId}-{actorRecordId}');
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
        airEntity: AirEntityUuId
    ): void {
        let airEntityId = this.parseUuId(idString)
        if (!airEntity.repository) {
            airEntity.repository = {
                uuId: airEntityId.repository.uuId
            }
        } else {
            airEntity.repository.uuId = airEntityId.repository.uuId
        }

        if (!airEntity.actor) {
            airEntity.actor = {
                uuId: airEntityId.repository.uuId
            }
        } else {
            airEntity.actor.uuId = airEntityId.actor.uuId
        }

        airEntity.actorRecordId = airEntityId.actorRecordId
    }

}
