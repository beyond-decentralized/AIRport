/* eslint-disable */
import {
	Classification,
} from '../ddl/type/classification';
import {
	ClassificationESelect,
	ClassificationECreateColumns,
	ClassificationECreateProperties,
	ClassificationEUpdateColumns,
	ClassificationEUpdateProperties,
	ClassificationEId,
	ClassificationGraph,
	QClassification,
} from './type/qclassification';
import {
	Client,
} from '../ddl/client/client';
import {
	ClientESelect,
	ClientECreateColumns,
	ClientECreateProperties,
	ClientEUpdateColumns,
	ClientEUpdateProperties,
	ClientEId,
	ClientGraph,
	QClient,
} from './client/qclient';
import {
	ClientType,
} from '../ddl/client/clienttype';
import {
	ClientTypeESelect,
	ClientTypeECreateColumns,
	ClientTypeECreateProperties,
	ClientTypeEUpdateColumns,
	ClientTypeEUpdateProperties,
	ClientTypeEId,
	ClientTypeGraph,
	QClientType,
} from './client/qclienttype';
import {
	Continent,
} from '../ddl/locality/continent';
import {
	ContinentESelect,
	ContinentECreateColumns,
	ContinentECreateProperties,
	ContinentEUpdateColumns,
	ContinentEUpdateProperties,
	ContinentEId,
	ContinentGraph,
	QContinent,
} from './locality/qcontinent';
import {
	Country,
} from '../ddl/locality/country';
import {
	CountryESelect,
	CountryECreateColumns,
	CountryECreateProperties,
	CountryEUpdateColumns,
	CountryEUpdateProperties,
	CountryEId,
	CountryGraph,
	QCountry,
} from './locality/qcountry';
import {
	Database,
} from '../ddl/database/database';
import {
	DatabaseESelect,
	DatabaseECreateColumns,
	DatabaseECreateProperties,
	DatabaseEUpdateColumns,
	DatabaseEUpdateProperties,
	DatabaseEId,
	DatabaseGraph,
	QDatabase,
} from './database/qdatabase';
import {
	DatabaseType,
} from '../ddl/database/databasetype';
import {
	DatabaseTypeESelect,
	DatabaseTypeECreateColumns,
	DatabaseTypeECreateProperties,
	DatabaseTypeEUpdateColumns,
	DatabaseTypeEUpdateProperties,
	DatabaseTypeEId,
	DatabaseTypeGraph,
	QDatabaseType,
} from './database/qdatabasetype';
import {
	MetroArea,
} from '../ddl/locality/metroarea';
import {
	MetroAreaESelect,
	MetroAreaECreateColumns,
	MetroAreaECreateProperties,
	MetroAreaEUpdateColumns,
	MetroAreaEUpdateProperties,
	MetroAreaEId,
	MetroAreaGraph,
	QMetroArea,
} from './locality/qmetroarea';
import {
	MetroAreaState,
} from '../ddl/locality/metroareastate';
import {
	MetroAreaStateESelect,
	MetroAreaStateECreateColumns,
	MetroAreaStateECreateProperties,
	MetroAreaStateEUpdateColumns,
	MetroAreaStateEUpdateProperties,
	MetroAreaStateEId,
	MetroAreaStateGraph,
	QMetroAreaState,
} from './locality/qmetroareastate';
import {
	State,
} from '../ddl/locality/state';
import {
	StateESelect,
	StateECreateColumns,
	StateECreateProperties,
	StateEUpdateColumns,
	StateEUpdateProperties,
	StateEId,
	StateGraph,
	QState,
} from './locality/qstate';
import {
	Terminal,
} from '../ddl/terminal/terminal';
import {
	TerminalESelect,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	TerminalGraph,
	QTerminal,
} from './terminal/qterminal';
import {
	TerminalType,
} from '../ddl/terminal/terminaltype';
import {
	TerminalTypeESelect,
	TerminalTypeECreateColumns,
	TerminalTypeECreateProperties,
	TerminalTypeEUpdateColumns,
	TerminalTypeEUpdateProperties,
	TerminalTypeEId,
	TerminalTypeGraph,
	QTerminalType,
} from './terminal/qterminaltype';
import {
	Type,
} from '../ddl/type/type';
import {
	TypeESelect,
	TypeECreateColumns,
	TypeECreateProperties,
	TypeEUpdateColumns,
	TypeEUpdateProperties,
	TypeEId,
	TypeGraph,
	QType,
} from './type/qtype';
import {
	TypeClassification,
} from '../ddl/type/typeclassification';
import {
	TypeClassificationESelect,
	TypeClassificationECreateColumns,
	TypeClassificationECreateProperties,
	TypeClassificationEUpdateColumns,
	TypeClassificationEUpdateProperties,
	TypeClassificationEId,
	TypeClassificationGraph,
	QTypeClassification,
} from './type/qtypeclassification';
import {
	User,
} from '../ddl/user';
import {
	UserESelect,
	UserECreateColumns,
	UserECreateProperties,
	UserEUpdateColumns,
	UserEUpdateProperties,
	UserEId,
	UserGraph,
	QUser,
} from './quser';
import {
	UserTerminal,
} from '../ddl/terminal/userterminal';
import {
	UserTerminalESelect,
	UserTerminalECreateColumns,
	UserTerminalECreateProperties,
	UserTerminalEUpdateColumns,
	UserTerminalEUpdateProperties,
	UserTerminalEId,
	UserTerminalGraph,
	QUserTerminal,
} from './terminal/quserterminal';
import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-traffic-control';
import {
	Duo,
} from '@airport/check-in';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		ApplicationEntity_LocalId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseClassificationDuo
  extends IDuo<Classification, ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification> {
}

export class BaseClassificationDuo
  extends SQDIDuo<Classification, ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification>
	implements IBaseClassificationDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseClientDuo
  extends IDuo<Client, ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient> {
}

export class BaseClientDuo
  extends SQDIDuo<Client, ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient>
	implements IBaseClientDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseClientTypeDuo
  extends IDuo<ClientType, ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType> {
}

export class BaseClientTypeDuo
  extends SQDIDuo<ClientType, ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType>
	implements IBaseClientTypeDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseContinentDuo
  extends IDuo<Continent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent> {
}

export class BaseContinentDuo
  extends SQDIDuo<Continent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent>
	implements IBaseContinentDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseCountryDuo
  extends IDuo<Country, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry> {
}

export class BaseCountryDuo
  extends SQDIDuo<Country, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry>
	implements IBaseCountryDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseDatabaseDuo
  extends IDuo<Database, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase> {
}

export class BaseDatabaseDuo
  extends SQDIDuo<Database, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase>
	implements IBaseDatabaseDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseDatabaseTypeDuo
  extends IDuo<DatabaseType, DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType> {
}

export class BaseDatabaseTypeDuo
  extends SQDIDuo<DatabaseType, DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType>
	implements IBaseDatabaseTypeDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseMetroAreaDuo
  extends IDuo<MetroArea, MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea> {
}

export class BaseMetroAreaDuo
  extends SQDIDuo<MetroArea, MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea>
	implements IBaseMetroAreaDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseMetroAreaStateDuo
  extends IDuo<MetroAreaState, MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState> {
}

export class BaseMetroAreaStateDuo
  extends SQDIDuo<MetroAreaState, MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState>
	implements IBaseMetroAreaStateDuo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseStateDuo
  extends IDuo<State, StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState> {
}

export class BaseStateDuo
  extends SQDIDuo<State, StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState>
	implements IBaseStateDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTerminalDuo
  extends IDuo<Terminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> {
}

export class BaseTerminalDuo
  extends SQDIDuo<Terminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal>
	implements IBaseTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseTerminalTypeDuo
  extends IDuo<TerminalType, TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType> {
}

export class BaseTerminalTypeDuo
  extends SQDIDuo<TerminalType, TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType>
	implements IBaseTerminalTypeDuo {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseTypeDuo
  extends IDuo<Type, TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType> {
}

export class BaseTypeDuo
  extends SQDIDuo<Type, TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType>
	implements IBaseTypeDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseTypeClassificationDuo
  extends IDuo<TypeClassification, TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification> {
}

export class BaseTypeClassificationDuo
  extends SQDIDuo<TypeClassification, TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification>
	implements IBaseTypeClassificationDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseUserDuo
  extends IDuo<User, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser> {
}

export class BaseUserDuo
  extends SQDIDuo<User, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser>
	implements IBaseUserDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseUserTerminalDuo
  extends IDuo<UserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal> {
}

export class BaseUserTerminalDuo
  extends SQDIDuo<UserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal>
	implements IBaseUserTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}
