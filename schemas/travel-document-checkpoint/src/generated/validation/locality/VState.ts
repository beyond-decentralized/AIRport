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
	State,
} from '../../../ddl/locality/State';
import {
	UserAccountVDescriptor,
} from '../VUserAccount';
import {
	UserAccount,
} from '../../../ddl/UserAccount';
import {
	IState,
} from '../../entity/locality/IState';



////////////////////
//  API INTERFACE //
////////////////////

export interface StateVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	id?: number | IVNumberField;
	
	// Non-Id Properties
	abbreviation?: string | IVStringField;
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	country?: CountryVDescriptor<Country>
	metroAreaStates?: StateVDescriptor<State>
	userAccounts?: UserAccountVDescriptor<UserAccount>

}


