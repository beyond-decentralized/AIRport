import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ApplicationVDescriptor,
} from './vapplication';
import {
	Application,
} from '../../ddl/application/Application';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	ApplicationVersion,
} from '../../ddl/application/ApplicationVersion';
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


