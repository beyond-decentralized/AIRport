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
	MetroAreaStateVDescriptor,
} from './vmetroareastate';
import {
	IMetroAreaState,
} from './metroareastate';
import {
	UserAccountVDescriptor,
} from '../vuseraccount';
import {
	IUserAccount,
} from '../useraccount';
import {
	IMetroArea,
} from './metroarea';



////////////////////
//  API INTERFACE //
////////////////////

export interface MetroAreaVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	id: number | IVNumberField;
	
	// Non-Id Properties
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	country?: CountryVDescriptor;
	metroAreaStates?: MetroAreaStateVDescriptor;
	userAccounts?: UserAccountVDescriptor;

}


