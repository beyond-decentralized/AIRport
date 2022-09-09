import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ITerminalRun,
} from '../entity/ITerminalRun';



////////////////////
//  API INTERFACE //
////////////////////

export interface TerminalRunVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	createTimestamp?: number | IVNumberField;
	randomNumber?: number | IVNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}


