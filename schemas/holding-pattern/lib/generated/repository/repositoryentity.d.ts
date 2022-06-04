import { IRepository } from './repository';
import { IActor } from '../infrastructure/actor';
export interface IRepositoryEntity {
    actorRecordId: number;
    repository: IRepository;
    actor: IActor;
    ageSuitability?: number;
    createdAt?: Date;
    createdBy?: string;
    systemWideOperationId?: number;
    originalActorRecordId?: number;
    originalRepository?: IRepository;
    originalActor?: IActor;
    id?: string;
}
//# sourceMappingURL=repositoryentity.d.ts.map