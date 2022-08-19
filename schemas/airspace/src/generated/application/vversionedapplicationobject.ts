import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	ApplicationVersion,
} from '../../ddl/application/ApplicationVersion';
import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';



////////////////////
//  API INTERFACE //
////////////////////

export interface VersionedApplicationObjectVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	deprecatedSinceVersion?: ApplicationVersionVDescriptor<ApplicationVersion>
	removedInVersion?: ApplicationVersionVDescriptor<ApplicationVersion>
	sinceVersion?: ApplicationVersionVDescriptor<ApplicationVersion>

}


