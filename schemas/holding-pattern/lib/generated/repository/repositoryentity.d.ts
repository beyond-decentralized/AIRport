import { IRepository } from './repository';
import { IActor } from '../infrastructure/actor';
export interface IRepositoryEntity {
    actorRecordId: number;
    originalActorRecordId: number;
    repository: IRepository;
    actor: IActor;
    originalActor: IActor;
    ageSuitability?: number;
    systemWideOperationId?: number;
    originalRepository?: IRepository;
}
//# sourceMappingURL=repositoryentity.d.ts.map