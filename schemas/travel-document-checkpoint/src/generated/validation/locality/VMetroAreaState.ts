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
} from './VState';
import {
	State,
} from '../../../ddl/locality/State';
import {
	MetroAreaVDescriptor,
} from './VMetroArea';
import {
	MetroArea,
} from '../../../ddl/locality/MetroArea';
import {
	IMetroAreaState,
} from '../../entity/locality/IMetroAreaState';



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


