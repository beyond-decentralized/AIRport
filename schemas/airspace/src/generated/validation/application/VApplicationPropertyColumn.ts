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
} from './VVersionedApplicationObject';
import {
	ApplicationColumnVDescriptor,
} from './VApplicationColumn';
import {
	ApplicationColumn,
} from '../../../ddl/application/ApplicationColumn';
import {
	ApplicationPropertyVDescriptor,
} from './VApplicationProperty';
import {
	ApplicationProperty,
} from '../../../ddl/application/ApplicationProperty';
import {
	IApplicationPropertyColumn,
} from '../../entity/application/IApplicationPropertyColumn';



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


