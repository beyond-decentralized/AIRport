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
	Continent,
} from '../../ddl/locality/Continent';
import {
	CountryVDescriptor,
} from '../locality/vcountry';
import {
	Country,
} from '../../ddl/locality/Country';
import {
	StateVDescriptor,
} from '../locality/vstate';
import {
	State,
} from '../../ddl/locality/State';
import {
	MetroAreaVDescriptor,
} from '../locality/vmetroarea';
import {
	MetroArea,
} from '../../ddl/locality/MetroArea';
import {
	ClientTypeVDescriptor,
} from './vclienttype';
import {
	ClientType,
} from '../../ddl/client/ClientType';
import {
	IClient,
} from './client';



////////////////////
//  API INTERFACE //
////////////////////

export interface ClientVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	domain?: string | IVStringField;
	GUID?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	continent?: ContinentVDescriptor<Continent>
	country?: CountryVDescriptor<Country>
	state?: StateVDescriptor<State>
	metroArea?: MetroAreaVDescriptor<MetroArea>
	clientTypes?: ClientTypeVDescriptor<ClientType>

}


