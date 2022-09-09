import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	JsonApplicationWithLastIds,
} from '@airport/apron';
import {
	ApplicationVDescriptor,
} from './VApplication';
import {
	Application,
} from '../../../ddl/application/Application';
import {
	ApplicationEntityVDescriptor,
} from './VApplicationEntity';
import {
	ApplicationEntity,
} from '../../../ddl/application/ApplicationEntity';
import {
	ApplicationReferenceVDescriptor,
} from './VApplicationReference';
import {
	ApplicationReference,
} from '../../../ddl/application/ApplicationReference';
import {
	IApplicationVersion,
} from '../../entity/application/IApplicationVersion';



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


