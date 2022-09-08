import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ApplicationVDescriptor,
	Application,
} from '@airport/airspace/dist/app/bundle';
import {
	RepositoryVDescriptor,
} from './vRepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	IRepositoryApplication,
} from './RepositoryApplication';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryApplicationVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	application?: ApplicationVDescriptor<Application>
	repository?: RepositoryVDescriptor<Repository>

  // Non-Id relations (including OneToMany's)

}


