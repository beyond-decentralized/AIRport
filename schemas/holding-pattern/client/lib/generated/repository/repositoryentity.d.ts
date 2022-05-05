import { IRepository } from './repository';
import { IActor } from '../infrastructure/actor';
export interface IRepositoryEntity {
    actorRecordId: number;
    repository: IRepository;
    actor: IActor;
    ageSuitability?: number;
    systemWideOperationId?: number;
    originalActorRecordId?: number;
    originalRepository?: IRepository;
    originalActor?: IActor;
}
//# sourceMappingURL=repositoryentity.d.ts.map