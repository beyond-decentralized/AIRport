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
	DatabaseTypeVDescriptor,
} from './vdatabasetype';
import {
	DatabaseType,
} from '../../ddl/database/DatabaseType';
import {
	IDatabase,
} from './database';



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


