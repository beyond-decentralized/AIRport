import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ContinentVDescriptor,
} from './VContinent';
import {
	Continent,
} from '../../../ddl/locality/Continent';
import {
	UserAccountVDescriptor,
} from '../VUserAccount';
import {
	UserAccount,
} from '../../../ddl/UserAccount';
import {
	ICountry,
} from '../../entity/locality/ICountry';



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


