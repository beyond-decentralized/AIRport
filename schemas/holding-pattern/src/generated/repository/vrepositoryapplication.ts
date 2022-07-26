import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ApplicationVDescriptor,
	IApplication,
} from '@airport/airspace';
import {
	RepositoryVDescriptor,
} from './vrepository';
import {
	IRepository,
} from './repository';
import {
	IRepositoryApplication,
} from './repositoryapplication';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryApplicationVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	application?: ApplicationVDescriptor;
	repository?: RepositoryVDescriptor;

  // Non-Id relations (including OneToMany's)

}


