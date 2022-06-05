import { User } from '@airport/travel-document-checkpoint';
import { IRepository } from './repository';
import { IActor } from '../infrastructure/actor';
export interface IRepositoryEntity {
    actorRecordId: number;
    repository: IRepository;
    actor: IActor;
    ageSuitability?: number;
    createdAt?: Date;
    systemWideOperationId?: number;
    originalActorRecordId?: number;
    originalRepository?: IRepository;
    originalActor?: IActor;
    id?: string;
    uuId?: string;
    createdBy?: User;
}
//# sourceMappingURL=repositoryentity.d.ts.map