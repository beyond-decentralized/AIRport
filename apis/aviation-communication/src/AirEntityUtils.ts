import { Injected } from '@airport/direction-indicator'
import { Message_Type } from './IMessage';

export type UserAccount_PublicSigningKey = string;
export type UserAccount_LocalId = number;
export type UserAccount_Email = string;
export type UserAccount_Username = string;

export interface InternalUserAccount {

    // Id Properties
    _localId: UserAccount_LocalId;

    // Id Relations

    // Non-Id Properties

    // doubles as the GUID
    accountPublicSigningKey: UserAccount_PublicSigningKey;
    username: UserAccount_Username;

    // Non-Id Relations

    // Transient Properties

    // Public Methods

}

export interface AirEntityId {

    repository?: {
        GUID?: string
    },
    actor?: {
        GUID?: string,
        userAccount?: InternalUserAccount
    },
    _actorRecordId?: number

}

export interface IAirEntityUtils {

    getCreatedBy(
        idObject: AirEntityId
    ): InternalUserAccount

    encodeId(
        idObject: AirEntityId
    ): string

    parseEGUID(
        idString: string
    ): AirEntityId

    setId(
        idString: string,
        airEntity: AirEntityId
    ): void

}

@Injected()
export class AirEntityUtils
    implements IAirEntityUtils {

    getCreatedBy(
        airEntity: AirEntityId
    ): InternalUserAccount {
        return airEntity.actor.userAccount
    }

    encodeId(
        idObject: AirEntityId
    ): string {
        if (!idObject.repository
            || !idObject.repository.GUID
            || !idObject.actor
            || !idObject.actor.GUID
            || !idObject._actorRecordId) {
            return null
        }
        if (typeof idObject.repository.GUID !== 'string') {
            throw Error(`Type of "repository.GUID" property is not a string.`)
        }
        if (typeof idObject.actor.GUID !== 'string') {
            throw Error(`Type of "actor.GUID" property is not a string.`)
        }
        if (typeof idObject._actorRecordId !== 'number') {
            throw Error(`Type of "_actorRecordId" property is not a number.`)
        }
        return idObject.repository.GUID + '-' + idObject.actor.GUID + '-' + idObject._actorRecordId
    }

    parseEGUID(
        idString: string
    ): AirEntityId {
        const idStringFragments = idString.split('-')
        if (idStringFragments.length !== 11) {
            throw new Error('Invalid Entity Id, expecting ${repository.GUID}-${actor.GUID}-${_actorRecordId}');
        }
        const repositoryGUIDFragments: string[] = []
        for (let i = 0; i < 5; i++) {
            repositoryGUIDFragments.push(idStringFragments[i])
        }
        const actorGUIDFragments: string[] = []
        for (let i = 5; i < 10; i++) {
            actorGUIDFragments.push(idStringFragments[i])
        }
        return {
            repository: {
                GUID: repositoryGUIDFragments.join('-')
            },
            actor: {
                GUID: actorGUIDFragments.join('-')
            },
            _actorRecordId: parseInt(idStringFragments[10])
        }
    }

    setId(
        idString: string,
        airEntity: AirEntityId
    ): void {
        if (!idString) {
            return
        }
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

        airEntity._actorRecordId = airEntityId._actorRecordId
    }

}
