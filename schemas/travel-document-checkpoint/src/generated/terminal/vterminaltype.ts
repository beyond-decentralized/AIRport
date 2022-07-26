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
	ITerminal,
} from './terminal';
import {
	TypeVDescriptor,
} from '../type/vtype';
import {
	IType,
} from '../type/type';
import {
	ITerminalType,
} from './terminaltype';



////////////////////
//  API INTERFACE //
////////////////////

export interface TerminalTypeVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	terminal?: TerminalVDescriptor;
	type?: TypeVDescriptor;

  // Non-Id relations (including OneToMany's)

}


