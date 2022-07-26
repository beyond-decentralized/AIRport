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
} from './vapplication';
import {
	IApplication,
} from './application';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	IApplicationVersion,
} from './applicationversion';
import {
	IApplicationCurrentVersion,
} from './applicationcurrentversion';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationCurrentVersionVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	application?: ApplicationVDescriptor;
	applicationVersion?: ApplicationVersionVDescriptor;

  // Non-Id relations (including OneToMany's)

}


