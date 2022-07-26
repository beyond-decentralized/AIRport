import { IEntityVDescriptor, IVDateField, IVNumberField } from '@airport/airbridge-validate';
import { RepositoryVDescriptor } from './vrepository';
import { ActorVDescriptor } from '../infrastructure/vactor';
export interface AirEntityVDescriptor extends IEntityVDescriptor {
    _actorRecordId?: number | IVNumberField;
    ageSuitability?: number | IVNumberField;
    createdAt?: Date | IVDateField;
    systemWideOperationId?: number | IVNumberField;
    originalActorRecordId?: number | IVNumberField;
    repository?: RepositoryVDescriptor;
    actor?: ActorVDescriptor;
    originalRepository?: RepositoryVDescriptor;
    originalActor?: ActorVDescriptor;
}
//# sourceMappingURL=vairentity.d.ts.map