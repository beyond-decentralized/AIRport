import { User } from '@airport/travel-document-checkpoint';
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
    createdBy?: User;
    isNew?: boolean;
    id?: string;
}
//# sourceMappingURL=airentity.d.ts.map