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
	Application,
} from '../../ddl/application/application';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	ApplicationVersion,
} from '../../ddl/application/applicationversion';
import {
	IApplicationCurrentVersion,
} from './applicationcurrentversion';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationCurrentVersionVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	application?: ApplicationVDescriptor<Application>
	applicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>

  // Non-Id relations (including OneToMany's)

}


