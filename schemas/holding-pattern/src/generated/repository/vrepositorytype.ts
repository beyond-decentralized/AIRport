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
	TypeVDescriptor,
	IType,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	IRepositoryType,
} from './repositorytype';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryTypeVDescriptor
	extends IEntityVDescriptor {
	// Id Properties

	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor;
	type?: TypeVDescriptor;

	// Non-Id relations (including OneToMany's)

}


