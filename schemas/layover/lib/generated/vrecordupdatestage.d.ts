import { IEntityVDescriptor, IVNumberField, IVUntypedField } from '@airbridge/validate';
import { ApplicationVersionVDescriptor, ApplicationVersion, ApplicationEntityVDescriptor, ApplicationEntity, ApplicationColumnVDescriptor, ApplicationColumn } from '@airport/airspace';
import { RepositoryVDescriptor, Repository, ActorVDescriptor, Actor } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
export interface RecordUpdateStageVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    _actorRecordId?: number | IVNumberField;
    updatedValue?: any | IVUntypedField;
    applicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
    entity?: ApplicationEntityVDescriptor<ApplicationEntity>;
    repository?: RepositoryVDescriptor<Repository>;
    actor?: ActorVDescriptor<Actor>;
    column?: ApplicationColumnVDescriptor<ApplicationColumn>;
}
//# sourceMappingURL=vrecordupdatestage.d.ts.map