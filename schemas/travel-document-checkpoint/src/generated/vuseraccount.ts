import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	DomainVDescriptor,
	IDomain,
} from '@airport/airspace';
import {
	ContinentVDescriptor,
} from './locality/vcontinent';
import {
	IContinent,
} from './locality/continent';
import {
	CountryVDescriptor,
} from './locality/vcountry';
import {
	ICountry,
} from './locality/country';
import {
	StateVDescriptor,
} from './locality/vstate';
import {
	IState,
} from './locality/state';
import {
	MetroAreaVDescriptor,
} from './locality/vmetroarea';
import {
	IMetroArea,
} from './locality/metroarea';
import {
	IUserAccount,
} from './useraccount';



////////////////////
//  API INTERFACE //
////////////////////

export interface UserAccountVDescriptor
    extends IEntityVDescriptor {
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
	domain?: DomainVDescriptor;
	continent?: ContinentVDescriptor;
	country?: CountryVDescriptor;
	state?: StateVDescriptor;
	metroArea?: MetroAreaVDescriptor;

}


