import { IRepository } from './repository';
import { IActor } from '../infrastructure/actor';
export interface IAirEntity {
    _actorRecordId?: number;
    repository: IRepository;
    actor: IActor;
    ageSuitability?: number;
    createdAt?: Date;
    systemWideOperationId?: number;
    originalActorRecordId?: number;
    originalRepository?: IRepository;
    originalActor?: IActor;
    id?: string;
    isNew?: boolean;
}
//# sourceMappingURL=airentity.d.ts.map