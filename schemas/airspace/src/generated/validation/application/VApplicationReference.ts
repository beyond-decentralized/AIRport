import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	VersionedApplicationObjectVDescriptor,
} from './VVersionedApplicationObject';
import {
	ApplicationVersionVDescriptor,
} from './VApplicationVersion';
import {
	ApplicationVersion,
} from '../../../ddl/application/ApplicationVersion';
import {
	IApplicationReference,
} from '../../entity/application/IApplicationReference';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationReferenceVDescriptor<T>
    extends VersionedApplicationObjectVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties
	index?: number | IVNumberField;

	// Id Relations - full property interfaces
	ownApplicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>
	referencedApplicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>

  // Non-Id relations (including OneToMany's)

}

