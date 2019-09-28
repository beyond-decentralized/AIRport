import { Actor } from '../infrastructure/Actor';
import { SystemWideOperationId } from '../common';
import { Stageable } from '../infrastructure/Stageable';
import { Repository } from './Repository';
/**
 * Created by Papa on 2/17/2017.
 */
export declare type RepositoryEntityActorRecordId = number;
export declare type RepositoryEntitySystemWideOperationId = SystemWideOperationId;
export declare abstract class RepositoryEntity extends Stageable {
    repository: Repository;
    actor: Actor;
    actorRecordId: RepositoryEntityActorRecordId;
    systemWideOperationId: RepositoryEntitySystemWideOperationId;
}
