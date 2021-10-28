import { Actor } from '../infrastructure/Actor';
import { SystemWideOperationId } from '../common';
import { Stageable } from '../infrastructure/Stageable';
import { Repository } from './Repository';
/**
 * Created by Papa on 2/17/2017.
 */
export declare type RepositoryEntity_ActorRecordId = number;
export declare type RepositoryEntity_AgeSuitability = 0 | 7 | 13 | 18;
export declare type RepositoryEntity_SystemWideOperationId = SystemWideOperationId;
export declare abstract class RepositoryEntity extends Stageable {
    repository: Repository;
    actor: Actor;
    actorRecordId: RepositoryEntity_ActorRecordId;
    ageSuitability: RepositoryEntity_AgeSuitability;
    systemWideOperationId: RepositoryEntity_SystemWideOperationId;
}
//# sourceMappingURL=RepositoryEntity.d.ts.map