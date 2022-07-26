import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	IApplicationVersion,
} from './applicationversion';
import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';



////////////////////
//  API INTERFACE //
////////////////////

export interface VersionedApplicationObjectVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	deprecatedSinceVersion?: ApplicationVersionVDescriptor;
	removedInVersion?: ApplicationVersionVDescriptor;
	sinceVersion?: ApplicationVersionVDescriptor;

}


