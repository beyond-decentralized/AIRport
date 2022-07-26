import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	StateVDescriptor,
} from './vstate';
import {
	IState,
} from './state';
import {
	MetroAreaVDescriptor,
} from './vmetroarea';
import {
	IMetroArea,
} from './metroarea';
import {
	IMetroAreaState,
} from './metroareastate';



////////////////////
//  API INTERFACE //
////////////////////

export interface MetroAreaStateVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	state?: StateVDescriptor;
	metroArea?: MetroAreaVDescriptor;

  // Non-Id relations (including OneToMany's)

}


