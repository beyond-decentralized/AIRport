import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	CountryVDescriptor,
} from './vcountry';
import {
	ICountry,
} from './country';
import {
	UserAccountVDescriptor,
} from '../vuseraccount';
import {
	IUserAccount,
} from '../useraccount';
import {
	IState,
} from './state';



////////////////////
//  API INTERFACE //
////////////////////

export interface StateVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	id: number | IVNumberField;
	
	// Non-Id Properties
	abbreviation?: string | IVStringField;
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	country?: CountryVDescriptor;
	metroAreaStates?: StateVDescriptor;
	userAccounts?: UserAccountVDescriptor;

}


