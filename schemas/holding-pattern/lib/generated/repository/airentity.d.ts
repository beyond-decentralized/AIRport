import { IRepository } from './repository';
import { IActor } from '../infrastructure/actor';
export interface IAirEntity {
    actorRecordId?: number;
    repository: IRepository;
    actor: IActor;
    ageSuitability?: number;
    createdAt?: Date;
    systemWideOperationId?: number;
    originalActorRecordId?: number;
    originalRepository?: IRepository;
    originalActor?: IActor;
    uuId?: string;
}
//# sourceMappingURL=airentity.d.ts.map