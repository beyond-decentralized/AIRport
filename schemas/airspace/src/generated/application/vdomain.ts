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
	IDomain,
} from './domain';



////////////////////
//  API INTERFACE //
////////////////////

export interface DomainVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applications?: ApplicationVDescriptor<Application>

}


