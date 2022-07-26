import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	TerminalVDescriptor,
} from './vterminal';
import {
	Terminal,
} from '../../ddl/terminal/Terminal';
import {
	TypeVDescriptor,
} from '../type/vtype';
import {
	Type,
} from '../../ddl/type/Type';
import {
	ITerminalType,
} from './terminaltype';



////////////////////
//  API INTERFACE //
////////////////////

export interface TerminalTypeVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	terminal?: TerminalVDescriptor<Terminal>
	type?: TypeVDescriptor<Type>

  // Non-Id relations (including OneToMany's)

}


