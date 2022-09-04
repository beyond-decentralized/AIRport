import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	RepositoryVDescriptor,
} from './vrepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	TypeVDescriptor,
	Type,
} from '@airport/travel-document-checkpoint/dist/app/bundle';
import {
	IRepositoryType,
} from './repositorytype';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryTypeVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor<Repository>
	type?: TypeVDescriptor<Type>

  // Non-Id relations (including OneToMany's)

}


