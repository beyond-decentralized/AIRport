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
	IContinent,
} from './continent';



////////////////////
//  API INTERFACE //
////////////////////

export interface ContinentVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	id: number | IVNumberField;
	
	// Non-Id Properties
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	countries?: CountryVDescriptor;
	userAccounts?: UserAccountVDescriptor;

}


