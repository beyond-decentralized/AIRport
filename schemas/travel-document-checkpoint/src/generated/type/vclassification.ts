import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	IClassification,
} from './classification';



////////////////////
//  API INTERFACE //
////////////////////

export interface ClassificationVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	id: number | IVNumberField;
	
	// Non-Id Properties
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}


