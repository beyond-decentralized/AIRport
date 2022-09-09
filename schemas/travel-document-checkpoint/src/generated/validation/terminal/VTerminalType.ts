import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	TerminalVDescriptor,
} from './VTerminal';
import {
	Terminal,
} from '../../../ddl/terminal/Terminal';
import {
	TypeVDescriptor,
} from '../type/VType';
import {
	Type,
} from '../../../ddl/type/Type';
import {
	ITerminalType,
} from '../../entity/terminal/ITerminalType';



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


