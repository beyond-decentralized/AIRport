import { Actor } from '../infrastructure/Actor';
import { SystemWideOperationId } from '../common';
import { Repository } from './Repository';
/**
 * Created by Papa on 2/17/2017.
 */
export declare type AirEntity_ActorRecordId = number;
export declare type AirEntity_SystemWideOperationId = SystemWideOperationId;
export declare abstract class AirEntity {
    repository?: Repository;
    actor?: Actor;
    _actorRecordId?: AirEntity_ActorRecordId;
    ageSuitability?: number;
    createdAt?: Date;
    systemWideOperationId?: AirEntity_SystemWideOperationId;
    originalRepository?: Repository;
    originalActor?: Actor;
    originalActorRecordId?: AirEntity_ActorRecordId;
    /**
     * A transient aggregate property, generated on the entity objects by the
     * QueryResultsDeserializer.doSetPropertyDescriptors.  It is
     * composed of:
     *
     * 	{
     * 		actor: {
     * 			uuId
     * 		},
     * 		_actorRecordId,
     * 		repository: {
     * 			uuId
     * 		}
     * 	}
     *
     * Returns:
     *
     * `${repository.uuId}-${actor.uuId}-${_actorRecordId}`
     *
     * Returns null if one of it's member Ids does not exist
     */
    uuId?: string;
    /**
     * A transient property, generated on the entity objects by the
     * QueryResultsDeserializer.doSetPropertyDescriptors.  It's value
     * is:
     *
     * 	true - this entity object has not been saved and does not have an id
     * 	false - this entity object has been saved and has an id
     *
     * It does not check the existence of UuId on the object - most of
     * the time existing objects are retrieved without a UuId (only with
     * the numeric id properties).
     */
    isNew?: boolean;
}
//# sourceMappingURL=AirEntity.d.ts.map