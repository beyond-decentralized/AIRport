/* eslint-disable */
import {
	Classification,
} from '../ddl/type/Classification';
import {
	ClassificationVDescriptor,
} from './validation/type/VClassification';
import {
	Client,
} from '../ddl/client/Client';
import {
	ClientVDescriptor,
} from './validation/client/VClient';
import {
	ClientType,
} from '../ddl/client/ClientType';
import {
	ClientTypeVDescriptor,
} from './validation/client/VClientType';
import {
	Continent,
} from '../ddl/locality/Continent';
import {
	ContinentVDescriptor,
} from './validation/locality/VContinent';
import {
	Country,
} from '../ddl/locality/Country';
import {
	CountryVDescriptor,
} from './validation/locality/VCountry';
import {
	Database,
} from '../ddl/database/Database';
import {
	DatabaseVDescriptor,
} from './validation/database/VDatabase';
import {
	DatabaseType,
} from '../ddl/database/DatabaseType';
import {
	DatabaseTypeVDescriptor,
} from './validation/database/VDatabaseType';
import {
	MetroArea,
} from '../ddl/locality/MetroArea';
import {
	MetroAreaVDescriptor,
} from './validation/locality/VMetroArea';
import {
	MetroAreaState,
} from '../ddl/locality/MetroAreaState';
import {
	MetroAreaStateVDescriptor,
} from './validation/locality/VMetroAreaState';
import {
	State,
} from '../ddl/locality/State';
import {
	StateVDescriptor,
} from './validation/locality/VState';
import {
	Terminal,
} from '../ddl/terminal/Terminal';
import {
	TerminalVDescriptor,
} from './validation/terminal/VTerminal';
import {
	TerminalType,
} from '../ddl/terminal/TerminalType';
import {
	TerminalTypeVDescriptor,
} from './validation/terminal/VTerminalType';
import {
	Type,
} from '../ddl/type/Type';
import {
	TypeVDescriptor,
} from './validation/type/VType';
import {
	TypeClassification,
} from '../ddl/type/TypeClassification';
import {
	TypeClassificationVDescriptor,
} from './validation/type/VTypeClassification';
import {
	UserAccount,
} from '../ddl/UserAccount';
import {
	UserAccountVDescriptor,
} from './validation/VUserAccount';
import {
	IDvo,
	Dvo,
} from '@airbridge/validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet,
} from './qApplication';

import Q from './qApplication'

// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo<Entity, EntityVDescriptor>
	extends Dvo<Entity, EntityVDescriptor> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseClassificationDvo
  extends IDvo<Classification, ClassificationVDescriptor<Classification>> {
}

export class BaseClassificationDvo
  extends SQDIDvo<Classification, ClassificationVDescriptor<Classification>>
	implements IBaseClassificationDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseClientDvo
  extends IDvo<Client, ClientVDescriptor<Client>> {
}

export class BaseClientDvo
  extends SQDIDvo<Client, ClientVDescriptor<Client>>
	implements IBaseClientDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseClientTypeDvo
  extends IDvo<ClientType, ClientTypeVDescriptor<ClientType>> {
}

export class BaseClientTypeDvo
  extends SQDIDvo<ClientType, ClientTypeVDescriptor<ClientType>>
	implements IBaseClientTypeDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseContinentDvo
  extends IDvo<Continent, ContinentVDescriptor<Continent>> {
}

export class BaseContinentDvo
  extends SQDIDvo<Continent, ContinentVDescriptor<Continent>>
	implements IBaseContinentDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseCountryDvo
  extends IDvo<Country, CountryVDescriptor<Country>> {
}

export class BaseCountryDvo
  extends SQDIDvo<Country, CountryVDescriptor<Country>>
	implements IBaseCountryDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseDatabaseDvo
  extends IDvo<Database, DatabaseVDescriptor<Database>> {
}

export class BaseDatabaseDvo
  extends SQDIDvo<Database, DatabaseVDescriptor<Database>>
	implements IBaseDatabaseDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseDatabaseTypeDvo
  extends IDvo<DatabaseType, DatabaseTypeVDescriptor<DatabaseType>> {
}

export class BaseDatabaseTypeDvo
  extends SQDIDvo<DatabaseType, DatabaseTypeVDescriptor<DatabaseType>>
	implements IBaseDatabaseTypeDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseMetroAreaDvo
  extends IDvo<MetroArea, MetroAreaVDescriptor<MetroArea>> {
}

export class BaseMetroAreaDvo
  extends SQDIDvo<MetroArea, MetroAreaVDescriptor<MetroArea>>
	implements IBaseMetroAreaDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseMetroAreaStateDvo
  extends IDvo<MetroAreaState, MetroAreaStateVDescriptor<MetroAreaState>> {
}

export class BaseMetroAreaStateDvo
  extends SQDIDvo<MetroAreaState, MetroAreaStateVDescriptor<MetroAreaState>>
	implements IBaseMetroAreaStateDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseStateDvo
  extends IDvo<State, StateVDescriptor<State>> {
}

export class BaseStateDvo
  extends SQDIDvo<State, StateVDescriptor<State>>
	implements IBaseStateDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseTerminalDvo
  extends IDvo<Terminal, TerminalVDescriptor<Terminal>> {
}

export class BaseTerminalDvo
  extends SQDIDvo<Terminal, TerminalVDescriptor<Terminal>>
	implements IBaseTerminalDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseTerminalTypeDvo
  extends IDvo<TerminalType, TerminalTypeVDescriptor<TerminalType>> {
}

export class BaseTerminalTypeDvo
  extends SQDIDvo<TerminalType, TerminalTypeVDescriptor<TerminalType>>
	implements IBaseTerminalTypeDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseTypeDvo
  extends IDvo<Type, TypeVDescriptor<Type>> {
}

export class BaseTypeDvo
  extends SQDIDvo<Type, TypeVDescriptor<Type>>
	implements IBaseTypeDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseTypeClassificationDvo
  extends IDvo<TypeClassification, TypeClassificationVDescriptor<TypeClassification>> {
}

export class BaseTypeClassificationDvo
  extends SQDIDvo<TypeClassification, TypeClassificationVDescriptor<TypeClassification>>
	implements IBaseTypeClassificationDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseUserAccountDvo
  extends IDvo<UserAccount, UserAccountVDescriptor<UserAccount>> {
}

export class BaseUserAccountDvo
  extends SQDIDvo<UserAccount, UserAccountVDescriptor<UserAccount>>
	implements IBaseUserAccountDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(5)
	}
	
	constructor() {
		super(5)
	}
}
