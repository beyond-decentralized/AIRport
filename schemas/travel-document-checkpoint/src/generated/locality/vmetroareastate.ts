import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	StateVDescriptor,
} from './vstate';
import {
	State,
} from '../../ddl/locality/State';
import {
	MetroAreaVDescriptor,
} from './vmetroarea';
import {
	MetroArea,
} from '../../ddl/locality/MetroArea';
import {
	IMetroAreaState,
} from './metroareastate';



////////////////////
//  API INTERFACE //
////////////////////

export interface MetroAreaStateVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	state?: StateVDescriptor<State>
	metroArea?: MetroAreaVDescriptor<MetroArea>

  // Non-Id relations (including OneToMany's)

}


