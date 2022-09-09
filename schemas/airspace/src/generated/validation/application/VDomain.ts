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
	IDomain,
} from '../../entity/application/IDomain';



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


