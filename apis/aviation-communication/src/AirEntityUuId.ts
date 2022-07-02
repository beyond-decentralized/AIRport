import { Injected } from '@airport/direction-indicator'


export interface IUser {

    // Id Properties
    id?: number;

    // Id Relations

    // Non-Id Properties
    email?: string;
    passwordHash?: string;
    ranking?: number;
    username?: string;
    GUID?: string;

    // Non-Id Relations

    // Transient Properties

    // Public Methods

}

export interface AirEntityUuId {

    repository?: {
        GUID?: string
    },
    actor?: {
        GUID?: string,
        user?: IUser
    },
    actorRecordId?: number

}

export interface IAirEntityUtils {

    getCreatedBy(
        idObject: AirEntityUuId
    ): IUser

    encodeUuId(
        idObject: AirEntityUuId
    ): string

    parseEGUID(
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
            || !idObject.repository.GUID
            || !idObject.actor
            || !idObject.actor.GUID
            || !idObject.actorRecordId) {
            return null
        }
        if (typeof idObject.repository.GUID !== 'string') {
            throw Error(`Type of "repository.uuId" property is not a string.`)
        }
        if (typeof idObject.actor.GUID !== 'string') {
            throw Error(`Type of "actor.uuId" property is not a string.`)
        }
        if (typeof idObject.actorRecordId !== 'number') {
            throw Error(`Type of "actorRecordId" property is not a number.`)
        }
        return idObject.repository.GUID + '-' + idObject.actor.GUID + '-' + idObject.actorRecordId
    }

    parseEGUID(
        idString: string
    ): AirEntityUuId {
        const idStringFragments = idString.split('-')
        if (idStringFragments.length !== 11) {
            throw new Error('Invalid Entity GUID, expecting ${repository.uuId}-${actor.uuId}-${actorRecordId}');
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
                GUID: repositoryUuIdFragments.join('-')
            },
            actor: {
                GUID: actorUuIdFragments.join('-')
            },
            actorRecordId: parseInt(idStringFragments[11])
        }
    }

    setUuId(
        idString: string,
        airEntity: AirEntityUuId
    ): void {
        let airEntityId = this.parseEGUID(idString)
        if (!airEntity.repository) {
            airEntity.repository = {
                GUID: airEntityId.repository.GUID
            }
        } else {
            airEntity.repository.GUID = airEntityId.repository.GUID
        }

        if (!airEntity.actor) {
            airEntity.actor = {
                GUID: airEntityId.repository.GUID
            }
        } else {
            airEntity.actor.GUID = airEntityId.actor.GUID
        }

        airEntity.actorRecordId = airEntityId.actorRecordId
    }

}
