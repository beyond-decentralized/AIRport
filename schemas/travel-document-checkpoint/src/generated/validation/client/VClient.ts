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
} from '../locality/VContinent';
import {
	Continent,
} from '../../../ddl/locality/Continent';
import {
	CountryVDescriptor,
} from '../locality/VCountry';
import {
	Country,
} from '../../../ddl/locality/Country';
import {
	StateVDescriptor,
} from '../locality/VState';
import {
	State,
} from '../../../ddl/locality/State';
import {
	MetroAreaVDescriptor,
} from '../locality/VMetroArea';
import {
	MetroArea,
} from '../../../ddl/locality/MetroArea';
import {
	ClientTypeVDescriptor,
} from './VClientType';
import {
	ClientType,
} from '../../../ddl/client/ClientType';
import {
	IClient,
} from '../../entity/client/IClient';



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


