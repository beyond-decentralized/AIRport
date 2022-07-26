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
	IApplicationVersion,
	ApplicationEntityVDescriptor,
	IApplicationEntity,
	ApplicationColumnVDescriptor,
	IApplicationColumn,
} from '@airport/airspace';
import {
	RepositoryVDescriptor,
	IRepository,
	ActorVDescriptor,
	IActor,
} from '@airport/holding-pattern';
import {
	IRecordUpdateStage,
} from './recordupdatestage';



////////////////////
//  API INTERFACE //
////////////////////

export interface RecordUpdateStageVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	_actorRecordId?: number | IVNumberField;
	updatedValue?: any | IVUntypedField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applicationVersion?: ApplicationVersionVDescriptor;
	entity?: ApplicationEntityVDescriptor;
	repository?: RepositoryVDescriptor;
	actor?: ActorVDescriptor;
	column?: ApplicationColumnVDescriptor;

}


