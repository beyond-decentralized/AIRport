import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ITerminalRun,
} from './terminalrun';



////////////////////
//  API INTERFACE //
////////////////////

export interface TerminalRunVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	createTimestamp?: number | IVNumberField;
	randomNumber?: number | IVNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}


