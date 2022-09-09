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
} from './VApplication';
import {
	Application,
} from '../../../ddl/application/Application';
import {
	ApplicationVersionVDescriptor,
} from './VApplicationVersion';
import {
	ApplicationVersion,
} from '../../../ddl/application/ApplicationVersion';
import {
	IApplicationCurrentVersion,
} from '../../entity/application/IApplicationCurrentVersion';



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


