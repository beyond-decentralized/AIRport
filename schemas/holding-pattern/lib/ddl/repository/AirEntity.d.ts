import { Actor } from '../infrastructure/Actor';
import { SystemWideOperationId } from '../common';
import { Repository } from './Repository';
import { User } from '@airport/travel-document-checkpoint';
/**
 * Created by Papa on 2/17/2017.
 */
export declare type AirEntity_ActorRecordId = number;
export declare type AirEntity_SystemWideOperationId = SystemWideOperationId;
export declare abstract class AirEntity {
    repository: Repository;
    actor: Actor;
    actorRecordId: AirEntity_ActorRecordId;
    ageSuitability: number;
    createdAt?: Date;
    systemWideOperationId: AirEntity_SystemWideOperationId;
    originalRepository: Repository;
    originalActor: Actor;
    originalActorRecordId: AirEntity_ActorRecordId;
    uuId?: string;
    createdBy?: User;
}
//# sourceMappingURL=AirEntity.d.ts.map