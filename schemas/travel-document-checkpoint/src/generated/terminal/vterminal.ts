import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	UserAccountVDescriptor,
} from '../vuseraccount';
import {
	IUserAccount,
} from '../useraccount';
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
	TerminalTypeVDescriptor,
} from './vterminaltype';
import {
	ITerminalType,
} from './terminaltype';
import {
	ITerminal,
} from './terminal';



////////////////////
//  API INTERFACE //
////////////////////

export interface TerminalVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	GUID?: string | IVStringField;
	isLocal?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserAccountVDescriptor;
	continent?: ContinentVDescriptor;
	country?: CountryVDescriptor;
	state?: StateVDescriptor;
	metroArea?: MetroAreaVDescriptor;
	terminalTypes?: TerminalTypeVDescriptor;

}


