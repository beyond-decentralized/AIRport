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
} from '../vuseraccount';
import {
	UserAccount,
} from '../../ddl/UserAccount';
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
	TerminalTypeVDescriptor,
} from './vterminaltype';
import {
	TerminalType,
} from '../../ddl/terminal/TerminalType';
import {
	ITerminal,
} from './terminal';



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


