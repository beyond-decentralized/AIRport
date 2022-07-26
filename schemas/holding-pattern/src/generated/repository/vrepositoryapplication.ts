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
	Application,
} from '@airport/airspace';
import {
	RepositoryVDescriptor,
} from './vrepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	IRepositoryApplication,
} from './repositoryapplication';



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


