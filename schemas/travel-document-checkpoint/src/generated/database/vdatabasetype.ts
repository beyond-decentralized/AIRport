import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	DatabaseVDescriptor,
} from './vdatabase';
import {
	IDatabase,
} from './database';
import {
	TypeVDescriptor,
} from '../type/vtype';
import {
	IType,
} from '../type/type';
import {
	IDatabaseType,
} from './databasetype';



////////////////////
//  API INTERFACE //
////////////////////

export interface DatabaseTypeVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	database?: DatabaseVDescriptor;
	type?: TypeVDescriptor;

  // Non-Id relations (including OneToMany's)

}


