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
	IDomain,
} from './domain';



////////////////////
//  API INTERFACE //
////////////////////

export interface DomainVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applications?: ApplicationVDescriptor;

}


