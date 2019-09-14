import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import {
	Dao
} from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	diSet
} from './qSchema'
import {
	IAgt,
	AgtESelect,
	AgtECascadeGraph,
	AgtECreateColumns,
	AgtECreateProperties,
	AgtEUpdateColumns,
	AgtEUpdateProperties,
	AgtEId,
	QAgt
} from './qagt'
import {
	ITerminal,
	TerminalESelect,
	TerminalECascadeGraph,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	QTerminal
} from './qterminal'
import {
	ITerminalAgt,
	TerminalAgtESelect,
	TerminalAgtECascadeGraph,
	TerminalAgtECreateColumns,
	TerminalAgtECreateProperties,
	TerminalAgtEUpdateColumns,
	TerminalAgtEUpdateProperties,
	TerminalAgtEId,
	QTerminalAgt
} from './qterminalagt'
import {
	IUser,
	UserESelect,
	UserECascadeGraph,
	UserECreateColumns,
	UserECreateProperties,
	UserEUpdateColumns,
	UserEUpdateProperties,
	UserEId,
	QUser
} from './quser'
import {
	IUserTerminal,
	UserTerminalESelect,
	UserTerminalECascadeGraph,
	UserTerminalECreateColumns,
	UserTerminalECreateProperties,
	UserTerminalEUpdateColumns,
	UserTerminalEUpdateProperties,
	UserTerminalEId,
	QUserTerminal
} from './quserterminal'
import {
	IUserTerminalAgt,
	UserTerminalAgtESelect,
	UserTerminalAgtECascadeGraph,
	UserTerminalAgtECreateColumns,
	UserTerminalAgtECreateProperties,
	UserTerminalAgtEUpdateColumns,
	UserTerminalAgtEUpdateProperties,
	UserTerminalAgtEId,
	QUserTerminalAgt
} from './quserterminalagt'

// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseAgtDao
  extends IDao<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt> {
}

export class BaseAgtDao
  extends SQDIDao<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt>
	implements IBaseAgtDao {

	static diSet(): boolean {
		return diSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseTerminalDao
  extends IDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> {
}

export class BaseTerminalDao
  extends SQDIDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal>
	implements IBaseTerminalDao {

	static diSet(): boolean {
		return diSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseTerminalAgtDao
  extends IDao<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt> {
}

export class BaseTerminalAgtDao
  extends SQDIDao<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt>
	implements IBaseTerminalAgtDao {

	static diSet(): boolean {
		return diSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseUserDao
  extends IDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> {
}

export class BaseUserDao
  extends SQDIDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser>
	implements IBaseUserDao {

	static diSet(): boolean {
		return diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseUserTerminalDao
  extends IDao<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal> {
}

export class BaseUserTerminalDao
  extends SQDIDao<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal>
	implements IBaseUserTerminalDao {

	static diSet(): boolean {
		return diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseUserTerminalAgtDao
  extends IDao<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt> {
}

export class BaseUserTerminalAgtDao
  extends SQDIDao<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt>
	implements IBaseUserTerminalAgtDao {

	static diSet(): boolean {
		return diSet(1)
	}
	
	constructor() {
		super(1)
	}
}
