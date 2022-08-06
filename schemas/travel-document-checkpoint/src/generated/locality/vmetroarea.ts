import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	CountryVDescriptor,
} from './vcountry';
import {
	Country,
} from '../../ddl/locality/Country';
import {
	MetroAreaStateVDescriptor,
} from './vmetroareastate';
import {
	MetroAreaState,
} from '../../ddl/locality/MetroAreaState';
import {
	UserAccountVDescriptor,
} from '../vuseraccount';
import {
	UserAccount,
} from '../../ddl/UserAccount';
import {
	IMetroArea,
} from './metroarea';



////////////////////
//  API INTERFACE //
////////////////////

export interface MetroAreaVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	id?: number | IVNumberField;
	
	// Non-Id Properties
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	country?: CountryVDescriptor<Country>
	metroAreaStates?: MetroAreaStateVDescriptor<MetroAreaState>
	userAccounts?: UserAccountVDescriptor<UserAccount>

}


