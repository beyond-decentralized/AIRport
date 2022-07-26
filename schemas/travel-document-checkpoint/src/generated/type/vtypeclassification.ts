import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ClassificationVDescriptor,
} from './vclassification';
import {
	IClassification,
} from './classification';
import {
	TypeVDescriptor,
} from './vtype';
import {
	IType,
} from './type';
import {
	ITypeClassification,
} from './typeclassification';



////////////////////
//  API INTERFACE //
////////////////////

export interface TypeClassificationVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	classification?: ClassificationVDescriptor;
	type?: TypeVDescriptor;

  // Non-Id relations (including OneToMany's)

}


