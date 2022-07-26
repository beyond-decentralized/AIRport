import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ClientVDescriptor,
} from './vclient';
import {
	IClient,
} from './client';
import {
	TypeVDescriptor,
} from '../type/vtype';
import {
	IType,
} from '../type/type';
import {
	IClientType,
} from './clienttype';



////////////////////
//  API INTERFACE //
////////////////////

export interface ClientTypeVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	client?: ClientVDescriptor;
	type?: TypeVDescriptor;

  // Non-Id relations (including OneToMany's)

}


