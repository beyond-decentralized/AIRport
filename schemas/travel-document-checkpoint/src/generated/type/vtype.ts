import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	TypeClassificationVDescriptor,
} from './vtypeclassification';
import {
	ITypeClassification,
} from './typeclassification';
import {
	IType,
} from './type';



////////////////////
//  API INTERFACE //
////////////////////

export interface TypeVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	id: number | IVNumberField;
	
	// Non-Id Properties
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	typeClassifications?: TypeClassificationVDescriptor;

}


