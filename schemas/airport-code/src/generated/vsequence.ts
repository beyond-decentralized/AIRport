import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ISequence,
} from './sequence';



////////////////////
//  API INTERFACE //
////////////////////

export interface SequenceVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	applicationIndex?: number | IVNumberField;
	tableIndex?: number | IVNumberField;
	columnIndex?: number | IVNumberField;
	
	// Non-Id Properties
	incrementBy?: number | IVNumberField;
	currentValue?: number | IVNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}


