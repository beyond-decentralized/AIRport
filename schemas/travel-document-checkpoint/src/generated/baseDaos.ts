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
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-traffic-control';
import {
	Dao,
	DaoQueryDecorators,
} from '@airport/check-in';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Dao<Entity,
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


export interface IBaseClassificationDao
  extends IDao<Classification, ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification> {
}

export class BaseClassificationDao
  extends SQDIDao<Classification, ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification>
	implements IBaseClassificationDao {
	
	static Find      = new DaoQueryDecorators<ClassificationESelect>();
	static FindOne   = new DaoQueryDecorators<ClassificationESelect>();
	static Search    = new DaoQueryDecorators<ClassificationESelect>();
	static SearchOne = new DaoQueryDecorators<ClassificationESelect>();
	static Save(
		config: ClassificationGraph
	): PropertyDecorator {
		return Dao.BaseSave<ClassificationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseClientDao
  extends IDao<Client, ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient> {
}

export class BaseClientDao
  extends SQDIDao<Client, ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient>
	implements IBaseClientDao {
	
	static Find      = new DaoQueryDecorators<ClientESelect>();
	static FindOne   = new DaoQueryDecorators<ClientESelect>();
	static Search    = new DaoQueryDecorators<ClientESelect>();
	static SearchOne = new DaoQueryDecorators<ClientESelect>();
	static Save(
		config: ClientGraph
	): PropertyDecorator {
		return Dao.BaseSave<ClientGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseClientTypeDao
  extends IDao<ClientType, ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType> {
}

export class BaseClientTypeDao
  extends SQDIDao<ClientType, ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType>
	implements IBaseClientTypeDao {
	
	static Find      = new DaoQueryDecorators<ClientTypeESelect>();
	static FindOne   = new DaoQueryDecorators<ClientTypeESelect>();
	static Search    = new DaoQueryDecorators<ClientTypeESelect>();
	static SearchOne = new DaoQueryDecorators<ClientTypeESelect>();
	static Save(
		config: ClientTypeGraph
	): PropertyDecorator {
		return Dao.BaseSave<ClientTypeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseContinentDao
  extends IDao<Continent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent> {
}

export class BaseContinentDao
  extends SQDIDao<Continent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent>
	implements IBaseContinentDao {
	
	static Find      = new DaoQueryDecorators<ContinentESelect>();
	static FindOne   = new DaoQueryDecorators<ContinentESelect>();
	static Search    = new DaoQueryDecorators<ContinentESelect>();
	static SearchOne = new DaoQueryDecorators<ContinentESelect>();
	static Save(
		config: ContinentGraph
	): PropertyDecorator {
		return Dao.BaseSave<ContinentGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseCountryDao
  extends IDao<Country, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry> {
}

export class BaseCountryDao
  extends SQDIDao<Country, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry>
	implements IBaseCountryDao {
	
	static Find      = new DaoQueryDecorators<CountryESelect>();
	static FindOne   = new DaoQueryDecorators<CountryESelect>();
	static Search    = new DaoQueryDecorators<CountryESelect>();
	static SearchOne = new DaoQueryDecorators<CountryESelect>();
	static Save(
		config: CountryGraph
	): PropertyDecorator {
		return Dao.BaseSave<CountryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseDatabaseDao
  extends IDao<Database, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase> {
}

export class BaseDatabaseDao
  extends SQDIDao<Database, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase>
	implements IBaseDatabaseDao {
	
	static Find      = new DaoQueryDecorators<DatabaseESelect>();
	static FindOne   = new DaoQueryDecorators<DatabaseESelect>();
	static Search    = new DaoQueryDecorators<DatabaseESelect>();
	static SearchOne = new DaoQueryDecorators<DatabaseESelect>();
	static Save(
		config: DatabaseGraph
	): PropertyDecorator {
		return Dao.BaseSave<DatabaseGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseDatabaseTypeDao
  extends IDao<DatabaseType, DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType> {
}

export class BaseDatabaseTypeDao
  extends SQDIDao<DatabaseType, DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType>
	implements IBaseDatabaseTypeDao {
	
	static Find      = new DaoQueryDecorators<DatabaseTypeESelect>();
	static FindOne   = new DaoQueryDecorators<DatabaseTypeESelect>();
	static Search    = new DaoQueryDecorators<DatabaseTypeESelect>();
	static SearchOne = new DaoQueryDecorators<DatabaseTypeESelect>();
	static Save(
		config: DatabaseTypeGraph
	): PropertyDecorator {
		return Dao.BaseSave<DatabaseTypeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseMetroAreaDao
  extends IDao<MetroArea, MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea> {
}

export class BaseMetroAreaDao
  extends SQDIDao<MetroArea, MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea>
	implements IBaseMetroAreaDao {
	
	static Find      = new DaoQueryDecorators<MetroAreaESelect>();
	static FindOne   = new DaoQueryDecorators<MetroAreaESelect>();
	static Search    = new DaoQueryDecorators<MetroAreaESelect>();
	static SearchOne = new DaoQueryDecorators<MetroAreaESelect>();
	static Save(
		config: MetroAreaGraph
	): PropertyDecorator {
		return Dao.BaseSave<MetroAreaGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseMetroAreaStateDao
  extends IDao<MetroAreaState, MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState> {
}

export class BaseMetroAreaStateDao
  extends SQDIDao<MetroAreaState, MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState>
	implements IBaseMetroAreaStateDao {
	
	static Find      = new DaoQueryDecorators<MetroAreaStateESelect>();
	static FindOne   = new DaoQueryDecorators<MetroAreaStateESelect>();
	static Search    = new DaoQueryDecorators<MetroAreaStateESelect>();
	static SearchOne = new DaoQueryDecorators<MetroAreaStateESelect>();
	static Save(
		config: MetroAreaStateGraph
	): PropertyDecorator {
		return Dao.BaseSave<MetroAreaStateGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseStateDao
  extends IDao<State, StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState> {
}

export class BaseStateDao
  extends SQDIDao<State, StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState>
	implements IBaseStateDao {
	
	static Find      = new DaoQueryDecorators<StateESelect>();
	static FindOne   = new DaoQueryDecorators<StateESelect>();
	static Search    = new DaoQueryDecorators<StateESelect>();
	static SearchOne = new DaoQueryDecorators<StateESelect>();
	static Save(
		config: StateGraph
	): PropertyDecorator {
		return Dao.BaseSave<StateGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseTerminalDao
  extends IDao<Terminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> {
}

export class BaseTerminalDao
  extends SQDIDao<Terminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal>
	implements IBaseTerminalDao {
	
	static Find      = new DaoQueryDecorators<TerminalESelect>();
	static FindOne   = new DaoQueryDecorators<TerminalESelect>();
	static Search    = new DaoQueryDecorators<TerminalESelect>();
	static SearchOne = new DaoQueryDecorators<TerminalESelect>();
	static Save(
		config: TerminalGraph
	): PropertyDecorator {
		return Dao.BaseSave<TerminalGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseTerminalTypeDao
  extends IDao<TerminalType, TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType> {
}

export class BaseTerminalTypeDao
  extends SQDIDao<TerminalType, TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType>
	implements IBaseTerminalTypeDao {
	
	static Find      = new DaoQueryDecorators<TerminalTypeESelect>();
	static FindOne   = new DaoQueryDecorators<TerminalTypeESelect>();
	static Search    = new DaoQueryDecorators<TerminalTypeESelect>();
	static SearchOne = new DaoQueryDecorators<TerminalTypeESelect>();
	static Save(
		config: TerminalTypeGraph
	): PropertyDecorator {
		return Dao.BaseSave<TerminalTypeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseTypeDao
  extends IDao<Type, TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType> {
}

export class BaseTypeDao
  extends SQDIDao<Type, TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType>
	implements IBaseTypeDao {
	
	static Find      = new DaoQueryDecorators<TypeESelect>();
	static FindOne   = new DaoQueryDecorators<TypeESelect>();
	static Search    = new DaoQueryDecorators<TypeESelect>();
	static SearchOne = new DaoQueryDecorators<TypeESelect>();
	static Save(
		config: TypeGraph
	): PropertyDecorator {
		return Dao.BaseSave<TypeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseTypeClassificationDao
  extends IDao<TypeClassification, TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification> {
}

export class BaseTypeClassificationDao
  extends SQDIDao<TypeClassification, TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification>
	implements IBaseTypeClassificationDao {
	
	static Find      = new DaoQueryDecorators<TypeClassificationESelect>();
	static FindOne   = new DaoQueryDecorators<TypeClassificationESelect>();
	static Search    = new DaoQueryDecorators<TypeClassificationESelect>();
	static SearchOne = new DaoQueryDecorators<TypeClassificationESelect>();
	static Save(
		config: TypeClassificationGraph
	): PropertyDecorator {
		return Dao.BaseSave<TypeClassificationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseUserDao
  extends IDao<User, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser> {
}

export class BaseUserDao
  extends SQDIDao<User, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser>
	implements IBaseUserDao {
	
	static Find      = new DaoQueryDecorators<UserESelect>();
	static FindOne   = new DaoQueryDecorators<UserESelect>();
	static Search    = new DaoQueryDecorators<UserESelect>();
	static SearchOne = new DaoQueryDecorators<UserESelect>();
	static Save(
		config: UserGraph
	): PropertyDecorator {
		return Dao.BaseSave<UserGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseUserTerminalDao
  extends IDao<UserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal> {
}

export class BaseUserTerminalDao
  extends SQDIDao<UserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal>
	implements IBaseUserTerminalDao {
	
	static Find      = new DaoQueryDecorators<UserTerminalESelect>();
	static FindOne   = new DaoQueryDecorators<UserTerminalESelect>();
	static Search    = new DaoQueryDecorators<UserTerminalESelect>();
	static SearchOne = new DaoQueryDecorators<UserTerminalESelect>();
	static Save(
		config: UserTerminalGraph
	): PropertyDecorator {
		return Dao.BaseSave<UserTerminalGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}
