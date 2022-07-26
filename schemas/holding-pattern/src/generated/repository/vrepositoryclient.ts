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
	ClientVDescriptor,
	Client,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	IRepositoryClient,
} from './repositoryclient';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryClientVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor<Repository>
	client?: ClientVDescriptor<Client>

  // Non-Id relations (including OneToMany's)

}


