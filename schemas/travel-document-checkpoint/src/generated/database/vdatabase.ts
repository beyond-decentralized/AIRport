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
} from '../locality/vcontinent';
import {
	IContinent,
} from '../locality/continent';
import {
	CountryVDescriptor,
} from '../locality/vcountry';
import {
	ICountry,
} from '../locality/country';
import {
	StateVDescriptor,
} from '../locality/vstate';
import {
	IState,
} from '../locality/state';
import {
	MetroAreaVDescriptor,
} from '../locality/vmetroarea';
import {
	IMetroArea,
} from '../locality/metroarea';
import {
	DatabaseTypeVDescriptor,
} from './vdatabasetype';
import {
	IDatabaseType,
} from './databasetype';
import {
	IDatabase,
} from './database';



////////////////////
//  API INTERFACE //
////////////////////

export interface DatabaseVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	domain?: string | IVStringField;
	GUID?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	continent?: ContinentVDescriptor;
	country?: CountryVDescriptor;
	state?: StateVDescriptor;
	metroArea?: MetroAreaVDescriptor;
	databaseTypes?: DatabaseTypeVDescriptor;

}


