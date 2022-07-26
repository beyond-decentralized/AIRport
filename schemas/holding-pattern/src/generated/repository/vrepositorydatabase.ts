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
	Repository,
} from '../../ddl/repository/Repository';
import {
	DatabaseVDescriptor,
	Database,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	IRepositoryDatabase,
} from './repositorydatabase';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryDatabaseVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor<Repository>
	database?: DatabaseVDescriptor<Database>

  // Non-Id relations (including OneToMany's)

}


