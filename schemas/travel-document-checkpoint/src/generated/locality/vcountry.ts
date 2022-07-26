import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ContinentVDescriptor,
} from './vcontinent';
import {
	IContinent,
} from './continent';
import {
	UserAccountVDescriptor,
} from '../vuseraccount';
import {
	IUserAccount,
} from '../useraccount';
import {
	ICountry,
} from './country';



////////////////////
//  API INTERFACE //
////////////////////

export interface CountryVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	id: number | IVNumberField;
	
	// Non-Id Properties
	abbreviation?: string | IVStringField;
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	continent?: ContinentVDescriptor;
	userAccounts?: UserAccountVDescriptor;

}


