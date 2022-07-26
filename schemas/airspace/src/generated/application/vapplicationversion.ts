import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	JsonApplicationWithLastIds,
} from '@airport/apron';
import {
	ApplicationVDescriptor,
} from './vapplication';
import {
	IApplication,
} from './application';
import {
	ApplicationEntityVDescriptor,
} from './vapplicationentity';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	ApplicationReferenceVDescriptor,
} from './vapplicationreference';
import {
	IApplicationReference,
} from './applicationreference';
import {
	IApplicationVersion,
} from './applicationversion';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationVersionVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	integerVersion?: number | IVNumberField;
	versionString?: string | IVStringField;
	majorVersion?: number | IVNumberField;
	minorVersion?: number | IVNumberField;
	patchVersion?: number | IVNumberField;
	jsonApplication?: JsonApplicationWithLastIds | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	application?: ApplicationVDescriptor;
	entities?: ApplicationEntityVDescriptor;
	references?: ApplicationReferenceVDescriptor;
	referencedBy?: ApplicationReferenceVDescriptor;

}


