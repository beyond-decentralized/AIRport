import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ApplicationVersionVDescriptor,
	ApplicationVersion,
	ApplicationEntityVDescriptor,
	ApplicationEntity,
	ApplicationColumnVDescriptor,
	ApplicationColumn,
} from '@airport/airspace';
import {
	RepositoryVDescriptor,
	Repository,
	ActorVDescriptor,
	Actor,
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import {
	IRecordUpdateStage,
} from './recordupdatestage';



////////////////////
//  API INTERFACE //
////////////////////

export interface RecordUpdateStageVDescriptor<T>
	extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;

	// Non-Id Properties
	_actorRecordId?: number | IVNumberField;
	updatedValue?: any | IVUntypedField;

	// Id Relations - full property interfaces

	// Non-Id relations (including OneToMany's)
	applicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>
	entity?: ApplicationEntityVDescriptor<ApplicationEntity>
	repository?: RepositoryVDescriptor<Repository>
	actor?: ActorVDescriptor<Actor>
	column?: ApplicationColumnVDescriptor<ApplicationColumn>

}


