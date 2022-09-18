/* eslint-disable */
import {
	Classification,
} from '../ddl/type/Classification';
import {
	ClassificationESelect,
	ClassificationECreateColumns,
	ClassificationECreateProperties,
	ClassificationEUpdateColumns,
	ClassificationEUpdateProperties,
	ClassificationEId,
	ClassificationGraph,
	QClassification,
} from './query/type/QClassification';
import {
	Client,
} from '../ddl/client/Client';
import {
	ClientESelect,
	ClientECreateColumns,
	ClientECreateProperties,
	ClientEUpdateColumns,
	ClientEUpdateProperties,
	ClientEId,
	ClientGraph,
	QClient,
} from './query/client/QClient';
import {
	ClientType,
} from '../ddl/client/ClientType';
import {
	ClientTypeESelect,
	ClientTypeECreateColumns,
	ClientTypeECreateProperties,
	ClientTypeEUpdateColumns,
	ClientTypeEUpdateProperties,
	ClientTypeEId,
	ClientTypeGraph,
	QClientType,
} from './query/client/QClientType';
import {
	Continent,
} from '../ddl/locality/Continent';
import {
	ContinentESelect,
	ContinentECreateColumns,
	ContinentECreateProperties,
	ContinentEUpdateColumns,
	ContinentEUpdateProperties,
	ContinentEId,
	ContinentGraph,
	QContinent,
} from './query/locality/QContinent';
import {
	Country,
} from '../ddl/locality/Country';
import {
	CountryESelect,
	CountryECreateColumns,
	CountryECreateProperties,
	CountryEUpdateColumns,
	CountryEUpdateProperties,
	CountryEId,
	CountryGraph,
	QCountry,
} from './query/locality/QCountry';
import {
	Database,
} from '../ddl/database/Database';
import {
	DatabaseESelect,
	DatabaseECreateColumns,
	DatabaseECreateProperties,
	DatabaseEUpdateColumns,
	DatabaseEUpdateProperties,
	DatabaseEId,
	DatabaseGraph,
	QDatabase,
} from './query/database/QDatabase';
import {
	DatabaseType,
} from '../ddl/database/DatabaseType';
import {
	DatabaseTypeESelect,
	DatabaseTypeECreateColumns,
	DatabaseTypeECreateProperties,
	DatabaseTypeEUpdateColumns,
	DatabaseTypeEUpdateProperties,
	DatabaseTypeEId,
	DatabaseTypeGraph,
	QDatabaseType,
} from './query/database/QDatabaseType';
import {
	MetroArea,
} from '../ddl/locality/MetroArea';
import {
	MetroAreaESelect,
	MetroAreaECreateColumns,
	MetroAreaECreateProperties,
	MetroAreaEUpdateColumns,
	MetroAreaEUpdateProperties,
	MetroAreaEId,
	MetroAreaGraph,
	QMetroArea,
} from './query/locality/QMetroArea';
import {
	MetroAreaState,
} from '../ddl/locality/MetroAreaState';
import {
	MetroAreaStateESelect,
	MetroAreaStateECreateColumns,
	MetroAreaStateECreateProperties,
	MetroAreaStateEUpdateColumns,
	MetroAreaStateEUpdateProperties,
	MetroAreaStateEId,
	MetroAreaStateGraph,
	QMetroAreaState,
} from './query/locality/QMetroAreaState';
import {
	State,
} from '../ddl/locality/State';
import {
	StateESelect,
	StateECreateColumns,
	StateECreateProperties,
	StateEUpdateColumns,
	StateEUpdateProperties,
	StateEId,
	StateGraph,
	QState,
} from './query/locality/QState';
import {
	Terminal,
} from '../ddl/terminal/Terminal';
import {
	TerminalESelect,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	TerminalGraph,
	QTerminal,
} from './query/terminal/QTerminal';
import {
	TerminalType,
} from '../ddl/terminal/TerminalType';
import {
	TerminalTypeESelect,
	TerminalTypeECreateColumns,
	TerminalTypeECreateProperties,
	TerminalTypeEUpdateColumns,
	TerminalTypeEUpdateProperties,
	TerminalTypeEId,
	TerminalTypeGraph,
	QTerminalType,
} from './query/terminal/QTerminalType';
import {
	Type,
} from '../ddl/type/Type';
import {
	TypeESelect,
	TypeECreateColumns,
	TypeECreateProperties,
	TypeEUpdateColumns,
	TypeEUpdateProperties,
	TypeEId,
	TypeGraph,
	QType,
} from './query/type/QType';
import {
	TypeClassification,
} from '../ddl/type/TypeClassification';
import {
	TypeClassificationESelect,
	TypeClassificationECreateColumns,
	TypeClassificationECreateProperties,
	TypeClassificationEUpdateColumns,
	TypeClassificationEUpdateProperties,
	TypeClassificationEId,
	TypeClassificationGraph,
	QTypeClassification,
} from './query/type/QTypeClassification';
import {
	UserAccount,
} from '../ddl/UserAccount';
import {
	UserAccountESelect,
	UserAccountECreateColumns,
	UserAccountECreateProperties,
	UserAccountEUpdateColumns,
	UserAccountEUpdateProperties,
	UserAccountEId,
	UserAccountGraph,
	QUserAccount,
} from './query/QUserAccount';
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/tarmaq-query';
import {
	IDao,
	Dao,
	DaoQueryDecorators,
} from '@airport/tarmaq-dao';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet,
} from './qApplication';

import Q from './qApplication'

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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(6)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(10)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(9)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(0)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(1)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(12)
	}
	
	constructor() {
		super(12)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(11)
	}
	
	constructor() {
		super(11)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(4)
	}
	
	constructor() {
		super(4)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(3)
	}
	
	constructor() {
		super(3)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(2)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(14)
	}
	
	constructor() {
		super(14)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(13)
	}
	
	constructor() {
		super(13)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(8)
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
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseUserAccountDao
  extends IDao<UserAccount, UserAccountESelect, UserAccountECreateProperties, UserAccountEUpdateColumns, UserAccountEUpdateProperties, UserAccountEId, UserAccountGraph, QUserAccount> {
}

export class BaseUserAccountDao
  extends SQDIDao<UserAccount, UserAccountESelect, UserAccountECreateProperties, UserAccountEUpdateColumns, UserAccountEUpdateProperties, UserAccountEId, UserAccountGraph, QUserAccount>
	implements IBaseUserAccountDao {
	
	static Find      = new DaoQueryDecorators<UserAccountESelect>();
	static FindOne   = new DaoQueryDecorators<UserAccountESelect>();
	static Search    = new DaoQueryDecorators<UserAccountESelect>();
	static SearchOne = new DaoQueryDecorators<UserAccountESelect>();
	static Save(
		config: UserAccountGraph
	): PropertyDecorator {
		return Dao.BaseSave<UserAccountGraph>(config);
  }

	static diSet(): boolean {
		return airport____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(5)
	}
	
	constructor() {
		super(5)
	}
}
