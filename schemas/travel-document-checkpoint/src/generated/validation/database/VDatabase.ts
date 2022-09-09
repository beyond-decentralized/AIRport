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
	DatabaseTypeVDescriptor,
} from './VDatabaseType';
import {
	DatabaseType,
} from '../../../ddl/database/DatabaseType';
import {
	IDatabase,
} from '../../entity/database/IDatabase';



////////////////////
//  API INTERFACE //
////////////////////

export interface DatabaseVDescriptor<T>
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
	databaseTypes?: DatabaseTypeVDescriptor<DatabaseType>

}


