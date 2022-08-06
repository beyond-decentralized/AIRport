import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ClientVDescriptor,
} from './vclient';
import {
	Client,
} from '../../ddl/client/Client';
import {
	TypeVDescriptor,
} from '../type/vtype';
import {
	Type,
} from '../../ddl/type/Type';
import {
	IClientType,
} from './clienttype';



////////////////////
//  API INTERFACE //
////////////////////

export interface ClientTypeVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	client?: ClientVDescriptor<Client>
	type?: TypeVDescriptor<Type>

  // Non-Id relations (including OneToMany's)

}


