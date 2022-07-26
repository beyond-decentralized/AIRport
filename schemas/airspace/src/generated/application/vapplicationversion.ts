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
	Application,
} from '../../ddl/application/application';
import {
	ApplicationEntityVDescriptor,
} from './vapplicationentity';
import {
	ApplicationEntity,
} from '../../ddl/application/applicationentity';
import {
	ApplicationReferenceVDescriptor,
} from './vapplicationreference';
import {
	ApplicationReference,
} from '../../ddl/application/applicationreference';
import {
	IApplicationVersion,
} from './applicationversion';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationVersionVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	integerVersion?: number | IVNumberField;
	versionString?: string | IVStringField;
	majorVersion?: number | IVNumberField;
	minorVersion?: number | IVNumberField;
	patchVersion?: number | IVNumberField;
	jsonApplication?: JsonApplicationWithLastIds | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	application?: ApplicationVDescriptor<Application>
	entities?: ApplicationEntityVDescriptor<ApplicationEntity>
	references?: ApplicationReferenceVDescriptor<ApplicationReference>
	referencedBy?: ApplicationReferenceVDescriptor<ApplicationReference>

}


