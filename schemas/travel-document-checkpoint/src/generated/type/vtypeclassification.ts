import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ClassificationVDescriptor,
} from './vclassification';
import {
	Classification,
} from '../../ddl/type/Classification';
import {
	TypeVDescriptor,
} from './vtype';
import {
	Type,
} from '../../ddl/type/Type';
import {
	ITypeClassification,
} from './typeclassification';



////////////////////
//  API INTERFACE //
////////////////////

export interface TypeClassificationVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	classification?: ClassificationVDescriptor<Classification>
	type?: TypeVDescriptor<Type>

  // Non-Id relations (including OneToMany's)

}


