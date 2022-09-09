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
} from './VCountry';
import {
	Country,
} from '../../../ddl/locality/Country';
import {
	MetroAreaStateVDescriptor,
} from './VMetroAreaState';
import {
	MetroAreaState,
} from '../../../ddl/locality/MetroAreaState';
import {
	UserAccountVDescriptor,
} from '../VUserAccount';
import {
	UserAccount,
} from '../../../ddl/UserAccount';
import {
	IMetroArea,
} from '../../entity/locality/IMetroArea';



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


