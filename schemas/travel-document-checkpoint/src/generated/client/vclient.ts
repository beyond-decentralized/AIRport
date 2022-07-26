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
	ClientTypeVDescriptor,
} from './vclienttype';
import {
	IClientType,
} from './clienttype';
import {
	IClient,
} from './client';



////////////////////
//  API INTERFACE //
////////////////////

export interface ClientVDescriptor
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
	clientTypes?: ClientTypeVDescriptor;

}


