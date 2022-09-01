import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	DomainVDescriptor,
	Domain,
} from '@airport/airspace/lib/to_be_generated/runtime-index';
import {
	ContinentVDescriptor,
} from './locality/vcontinent';
import {
	Continent,
} from '../ddl/locality/Continent';
import {
	CountryVDescriptor,
} from './locality/vcountry';
import {
	Country,
} from '../ddl/locality/Country';
import {
	StateVDescriptor,
} from './locality/vstate';
import {
	State,
} from '../ddl/locality/State';
import {
	MetroAreaVDescriptor,
} from './locality/vmetroarea';
import {
	MetroArea,
} from '../ddl/locality/MetroArea';
import {
	IUserAccount,
} from './useraccount';



////////////////////
//  API INTERFACE //
////////////////////

export interface UserAccountVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	email?: string | IVStringField;
	passwordHash?: string | IVStringField;
	ranking?: number | IVNumberField;
	username?: string | IVStringField;
	GUID?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainVDescriptor<Domain>
	continent?: ContinentVDescriptor<Continent>
	country?: CountryVDescriptor<Country>
	state?: StateVDescriptor<State>
	metroArea?: MetroAreaVDescriptor<MetroArea>

}


