import { IActor } from '../../generated/infrastructure/qactor';
import { IRepository } from '../../generated/repository/qrepository';
/**
 * Created by Papa on 2/17/2017.
 */
export declare type RepositoryEntityActorRecordId = number;
export declare abstract class RepositoryEntity {
    repository: IRepository;
    actor: IActor;
    actorRecordId: RepositoryEntityActorRecordId;
}
