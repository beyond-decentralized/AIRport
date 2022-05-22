import { Actor } from '../infrastructure/Actor';
import { SystemWideOperationId } from '../common';
import { Repository } from './Repository';
/**
 * Created by Papa on 2/17/2017.
 */
export declare type RepositoryEntity_ActorRecordId = number;
export declare type RepositoryEntity_SystemWideOperationId = SystemWideOperationId;
export declare abstract class RepositoryEntity {
    repository: Repository;
    actor: Actor;
    actorRecordId: RepositoryEntity_ActorRecordId;
    ageSuitability: number;
    systemWideOperationId: RepositoryEntity_SystemWideOperationId;
    originalRepository: Repository;
    originalActor: Actor;
    originalActorRecordId: RepositoryEntity_ActorRecordId;
    get id(): string;
    set id(idString: string);
}
//# sourceMappingURL=RepositoryEntity.d.ts.map