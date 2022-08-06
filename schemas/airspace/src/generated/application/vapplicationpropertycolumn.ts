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
} from './vversionedapplicationobject';
import {
	ApplicationColumnVDescriptor,
} from './vapplicationcolumn';
import {
	ApplicationColumn,
} from '../../ddl/application/applicationcolumn';
import {
	ApplicationPropertyVDescriptor,
} from './vapplicationproperty';
import {
	ApplicationProperty,
} from '../../ddl/application/applicationproperty';
import {
	IApplicationPropertyColumn,
} from './applicationpropertycolumn';



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


