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
	DatabaseVDescriptor,
	IDatabase,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	IRepositoryDatabase,
} from './repositorydatabase';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryDatabaseVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor;
	database?: DatabaseVDescriptor;

  // Non-Id relations (including OneToMany's)

}


