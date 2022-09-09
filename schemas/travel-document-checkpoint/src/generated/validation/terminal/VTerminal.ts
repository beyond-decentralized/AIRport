import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	UserAccountVDescriptor,
} from '../VUserAccount';
import {
	UserAccount,
} from '../../../ddl/UserAccount';
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
	TerminalTypeVDescriptor,
} from './VTerminalType';
import {
	TerminalType,
} from '../../../ddl/terminal/TerminalType';
import {
	ITerminal,
} from '../../entity/terminal/ITerminal';



////////////////////
//  API INTERFACE //
////////////////////

export interface TerminalVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	GUID?: string | IVStringField;
	isLocal?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserAccountVDescriptor<UserAccount>
	continent?: ContinentVDescriptor<Continent>
	country?: CountryVDescriptor<Country>
	state?: StateVDescriptor<State>
	metroArea?: MetroAreaVDescriptor<MetroArea>
	terminalTypes?: TerminalTypeVDescriptor<TerminalType>

}


