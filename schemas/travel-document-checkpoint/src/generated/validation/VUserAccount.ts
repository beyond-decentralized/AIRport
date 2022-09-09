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
} from '@airport/airspace/dist/app/bundle';
import {
	ContinentVDescriptor,
} from './locality/VContinent';
import {
	Continent,
} from '../../ddl/locality/Continent';
import {
	CountryVDescriptor,
} from './locality/VCountry';
import {
	Country,
} from '../../ddl/locality/Country';
import {
	StateVDescriptor,
} from './locality/VState';
import {
	State,
} from '../../ddl/locality/State';
import {
	MetroAreaVDescriptor,
} from './locality/VMetroArea';
import {
	MetroArea,
} from '../../ddl/locality/MetroArea';
import {
	IUserAccount,
} from '../entity/IUserAccount';



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


