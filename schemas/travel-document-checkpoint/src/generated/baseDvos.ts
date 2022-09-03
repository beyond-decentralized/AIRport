/* eslint-disable */
import {
	Classification,
} from '../ddl/type/classification';
import {
	ClassificationVDescriptor,
} from './type/vclassification';
import {
	Client,
} from '../ddl/client/client';
import {
	ClientVDescriptor,
} from './client/vclient';
import {
	ClientType,
} from '../ddl/client/clienttype';
import {
	ClientTypeVDescriptor,
} from './client/vclienttype';
import {
	Continent,
} from '../ddl/locality/continent';
import {
	ContinentVDescriptor,
} from './locality/vcontinent';
import {
	Country,
} from '../ddl/locality/country';
import {
	CountryVDescriptor,
} from './locality/vcountry';
import {
	Database,
} from '../ddl/database/database';
import {
	DatabaseVDescriptor,
} from './database/vdatabase';
import {
	DatabaseType,
} from '../ddl/database/databasetype';
import {
	DatabaseTypeVDescriptor,
} from './database/vdatabasetype';
import {
	MetroArea,
} from '../ddl/locality/metroarea';
import {
	MetroAreaVDescriptor,
} from './locality/vmetroarea';
import {
	MetroAreaState,
} from '../ddl/locality/metroareastate';
import {
	MetroAreaStateVDescriptor,
} from './locality/vmetroareastate';
import {
	State,
} from '../ddl/locality/state';
import {
	StateVDescriptor,
} from './locality/vstate';
import {
	Terminal,
} from '../ddl/terminal/terminal';
import {
	TerminalVDescriptor,
} from './terminal/vterminal';
import {
	TerminalType,
} from '../ddl/terminal/terminaltype';
import {
	TerminalTypeVDescriptor,
} from './terminal/vterminaltype';
import {
	Type,
} from '../ddl/type/type';
import {
	TypeVDescriptor,
} from './type/vtype';
import {
	TypeClassification,
} from '../ddl/type/typeclassification';
import {
	TypeClassificationVDescriptor,
} from './type/vtypeclassification';
import {
	UserAccount,
} from '../ddl/useraccount';
import {
	UserAccountVDescriptor,
} from './vuseraccount';
import {
	IDvo,
	Dvo,
} from '@airbridge/validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet,
} from './qApplication';


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
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseCountryDvo
  extends IDvo<Country, CountryVDescriptor<Country>> {
}

export class BaseCountryDvo
  extends SQDIDvo<Country, CountryVDescriptor<Country>>
	implements IBaseCountryDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(0)
	}
	
	constructor() {
		super(0)
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
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseMetroAreaStateDvo
  extends IDvo<MetroAreaState, MetroAreaStateVDescriptor<MetroAreaState>> {
}

export class BaseMetroAreaStateDvo
  extends SQDIDvo<MetroAreaState, MetroAreaStateVDescriptor<MetroAreaState>>
	implements IBaseMetroAreaStateDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseStateDvo
  extends IDvo<State, StateVDescriptor<State>> {
}

export class BaseStateDvo
  extends SQDIDvo<State, StateVDescriptor<State>>
	implements IBaseStateDvo {

	static diSet(): boolean {
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(1)
	}
	
	constructor() {
		super(1)
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
		return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(4)
	}
	
	constructor() {
		super(4)
	}
}
