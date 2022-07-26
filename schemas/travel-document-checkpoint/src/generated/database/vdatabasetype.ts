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
	Database,
} from '../../ddl/database/Database';
import {
	TypeVDescriptor,
} from '../type/vtype';
import {
	Type,
} from '../../ddl/type/Type';
import {
	IDatabaseType,
} from './databasetype';



////////////////////
//  API INTERFACE //
////////////////////

export interface DatabaseTypeVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	database?: DatabaseVDescriptor<Database>
	type?: TypeVDescriptor<Type>

  // Non-Id relations (including OneToMany's)

}


