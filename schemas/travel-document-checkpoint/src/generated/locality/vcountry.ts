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
	Continent,
} from '../../ddl/locality/Continent';
import {
	UserAccountVDescriptor,
} from '../vuseraccount';
import {
	UserAccount,
} from '../../ddl/UserAccount';
import {
	ICountry,
} from './country';



////////////////////
//  API INTERFACE //
////////////////////

export interface CountryVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	id?: number | IVNumberField;
	
	// Non-Id Properties
	abbreviation?: string | IVStringField;
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	continent?: ContinentVDescriptor<Continent>
	userAccounts?: UserAccountVDescriptor<UserAccount>

}


