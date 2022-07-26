import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	VersionedApplicationObjectVDescriptor,
} from './vversionedapplicationobject';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	IApplicationVersion,
} from './applicationversion';
import {
	IApplicationReference,
} from './applicationreference';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationReferenceVDescriptor
    extends VersionedApplicationObjectVDescriptor {
	// Id Properties
	
	// Non-Id Properties
	index?: number | IVNumberField;

	// Id Relations - full property interfaces
	ownApplicationVersion?: ApplicationVersionVDescriptor;
	referencedApplicationVersion?: ApplicationVersionVDescriptor;

  // Non-Id relations (including OneToMany's)

}


