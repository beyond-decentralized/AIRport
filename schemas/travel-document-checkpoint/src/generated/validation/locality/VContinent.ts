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
	UserAccountVDescriptor,
} from '../VUserAccount';
import {
	UserAccount,
} from '../../../ddl/UserAccount';
import {
	IContinent,
} from '../../entity/locality/IContinent';



////////////////////
//  API INTERFACE //
////////////////////

export interface ContinentVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	id?: number | IVNumberField;
	
	// Non-Id Properties
	name?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	countries?: CountryVDescriptor<Country>
	userAccounts?: UserAccountVDescriptor<UserAccount>

}


