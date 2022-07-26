import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	RepositoryVDescriptor,
} from './vrepository';
import {
	IRepository,
} from './repository';
import {
	ActorVDescriptor,
} from '../infrastructure/vactor';
import {
	IActor,
} from '../infrastructure/actor';
import {
	IAirEntity,
} from './airentity';



////////////////////
//  API INTERFACE //
////////////////////

export interface AirEntityVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_actorRecordId?: number | IVNumberField;
	
	// Non-Id Properties
	ageSuitability?: number | IVNumberField;
	createdAt?: Date | IVDateField;
	systemWideOperationId?: number | IVNumberField;
	originalActorRecordId?: number | IVNumberField;

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor;
	actor?: ActorVDescriptor;

  // Non-Id relations (including OneToMany's)
	originalRepository?: RepositoryVDescriptor;
	originalActor?: ActorVDescriptor;

}


