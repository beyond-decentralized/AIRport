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
} from '@airport/airbridge-validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
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
  extends IDvo<Classification, ClassificationVDescriptor> {
}

export class BaseClassificationDvo
  extends SQDIDvo<Classification, ClassificationVDescriptor>
	implements IBaseClassificationDvo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseClientDvo
  extends IDvo<Client, ClientVDescriptor> {
}

export class BaseClientDvo
  extends SQDIDvo<Client, ClientVDescriptor>
	implements IBaseClientDvo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseClientTypeDvo
  extends IDvo<ClientType, ClientTypeVDescriptor> {
}

export class BaseClientTypeDvo
  extends SQDIDvo<ClientType, ClientTypeVDescriptor>
	implements IBaseClientTypeDvo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseContinentDvo
  extends IDvo<Continent, ContinentVDescriptor> {
}

export class BaseContinentDvo
  extends SQDIDvo<Continent, ContinentVDescriptor>
	implements IBaseContinentDvo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseCountryDvo
  extends IDvo<Country, CountryVDescriptor> {
}

export class BaseCountryDvo
  extends SQDIDvo<Country, CountryVDescriptor>
	implements IBaseCountryDvo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseDatabaseDvo
  extends IDvo<Database, DatabaseVDescriptor> {
}

export class BaseDatabaseDvo
  extends SQDIDvo<Database, DatabaseVDescriptor>
	implements IBaseDatabaseDvo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseDatabaseTypeDvo
  extends IDvo<DatabaseType, DatabaseTypeVDescriptor> {
}

export class BaseDatabaseTypeDvo
  extends SQDIDvo<DatabaseType, DatabaseTypeVDescriptor>
	implements IBaseDatabaseTypeDvo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseMetroAreaDvo
  extends IDvo<MetroArea, MetroAreaVDescriptor> {
}

export class BaseMetroAreaDvo
  extends SQDIDvo<MetroArea, MetroAreaVDescriptor>
	implements IBaseMetroAreaDvo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseMetroAreaStateDvo
  extends IDvo<MetroAreaState, MetroAreaStateVDescriptor> {
}

export class BaseMetroAreaStateDvo
  extends SQDIDvo<MetroAreaState, MetroAreaStateVDescriptor>
	implements IBaseMetroAreaStateDvo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseStateDvo
  extends IDvo<State, StateVDescriptor> {
}

export class BaseStateDvo
  extends SQDIDvo<State, StateVDescriptor>
	implements IBaseStateDvo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseTerminalDvo
  extends IDvo<Terminal, TerminalVDescriptor> {
}

export class BaseTerminalDvo
  extends SQDIDvo<Terminal, TerminalVDescriptor>
	implements IBaseTerminalDvo {

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseTerminalTypeDvo
  extends IDvo<TerminalType, TerminalTypeVDescriptor> {
}

export class BaseTerminalTypeDvo
  extends SQDIDvo<TerminalType, TerminalTypeVDescriptor>
	implements IBaseTerminalTypeDvo {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseTypeDvo
  extends IDvo<Type, TypeVDescriptor> {
}

export class BaseTypeDvo
  extends SQDIDvo<Type, TypeVDescriptor>
	implements IBaseTypeDvo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseTypeClassificationDvo
  extends IDvo<TypeClassification, TypeClassificationVDescriptor> {
}

export class BaseTypeClassificationDvo
  extends SQDIDvo<TypeClassification, TypeClassificationVDescriptor>
	implements IBaseTypeClassificationDvo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseUserAccountDvo
  extends IDvo<UserAccount, UserAccountVDescriptor> {
}

export class BaseUserAccountDvo
  extends SQDIDvo<UserAccount, UserAccountVDescriptor>
	implements IBaseUserAccountDvo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}
