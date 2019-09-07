import { IActor } from '../../generated/infrastructure/qactor';
import { IRepository } from '../../generated/repository/qrepository';
import { SystemWideOperationId } from '../common';
import { Stageable } from '../infrastructure/Stageable';
/**
 * Created by Papa on 2/17/2017.
 */
export declare type RepositoryEntityActorRecordId = number;
export declare type RepositoryEntitySystemWideOperationId = SystemWideOperationId;
export declare abstract class RepositoryEntity extends Stageable {
    repository: IRepository;
    actor: IActor;
    actorRecordId: RepositoryEntityActorRecordId;
    systemWideOperationId: RepositoryEntitySystemWideOperationId;
}
