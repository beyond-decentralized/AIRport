import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	VersionedApplicationObjectVDescriptor,
} from './vversionedapplicationobject';
import {
	ApplicationColumnVDescriptor,
} from './vapplicationcolumn';
import {
	IApplicationColumn,
} from './applicationcolumn';
import {
	ApplicationPropertyVDescriptor,
} from './vapplicationproperty';
import {
	IApplicationProperty,
} from './applicationproperty';
import {
	IApplicationPropertyColumn,
} from './applicationpropertycolumn';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationPropertyColumnVDescriptor
    extends VersionedApplicationObjectVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	column?: ApplicationColumnVDescriptor;
	property?: ApplicationPropertyVDescriptor;

  // Non-Id relations (including OneToMany's)

}


