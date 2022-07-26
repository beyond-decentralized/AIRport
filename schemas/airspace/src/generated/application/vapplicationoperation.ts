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
	Operation_Rule,
} from '@airport/ground-control';
import {
	ApplicationEntityVDescriptor,
} from './vapplicationentity';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	IApplicationOperation,
} from './applicationoperation';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationOperationVDescriptor
    extends VersionedApplicationObjectVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	type?: number | IVNumberField;
	name?: string | IVStringField;
	rule?: Operation_Rule | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityVDescriptor;

}


