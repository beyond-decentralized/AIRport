import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	VersionedApplicationObjectVDescriptor,
} from './vVersionedApplicationObject';
import {
	ApplicationColumnVDescriptor,
} from './vApplicationColumn';
import {
	ApplicationColumn,
} from '../../ddl/application/ApplicationColumn';
import {
	ApplicationPropertyVDescriptor,
} from './vApplicationProperty';
import {
	ApplicationProperty,
} from '../../ddl/application/ApplicationProperty';
import {
	IApplicationPropertyColumn,
} from './ApplicationPropertyColumn';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationPropertyColumnVDescriptor<T>
    extends VersionedApplicationObjectVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	column?: ApplicationColumnVDescriptor<ApplicationColumn>
	property?: ApplicationPropertyVDescriptor<ApplicationProperty>

  // Non-Id relations (including OneToMany's)

}


