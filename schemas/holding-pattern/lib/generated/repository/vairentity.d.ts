import { IEntityVDescriptor, IVDateField, IVNumberField } from '@airport/airbridge-validate';
import { RepositoryVDescriptor } from './vrepository';
import { Repository } from '../../ddl/repository/Repository';
import { ActorVDescriptor } from '../infrastructure/vactor';
import { Actor } from '../../ddl/infrastructure/Actor';
export interface AirEntityVDescriptor<T> extends IEntityVDescriptor<T> {
    _actorRecordId?: number | IVNumberField;
    ageSuitability?: number | IVNumberField;
    createdAt?: Date | IVDateField;
    systemWideOperationId?: number | IVNumberField;
    originalActorRecordId?: number | IVNumberField;
    repository?: RepositoryVDescriptor<Repository>;
    actor?: ActorVDescriptor<Actor>;
    originalRepository?: RepositoryVDescriptor<Repository>;
    originalActor?: ActorVDescriptor<Actor>;
}
//# sourceMappingURL=vairentity.d.ts.map