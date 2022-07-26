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
	ClientVDescriptor,
	IClient,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	IRepositoryClient,
} from './repositoryclient';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryClientVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor;
	client?: ClientVDescriptor;

  // Non-Id relations (including OneToMany's)

}


