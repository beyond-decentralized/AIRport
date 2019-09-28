import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	IAgt
} from './agt'
import {
	AgtESelect,
	AgtECreateColumns,
	AgtECreateProperties,
	AgtEUpdateColumns,
	AgtEUpdateProperties,
	AgtEId,
	AgtECascadeGraph,
	QAgt
} from './qagt'
import {
	ITerminal
} from './terminal'
import {
	TerminalESelect,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	TerminalECascadeGraph,
	QTerminal
} from './qterminal'
import {
	ITerminalAgt
} from './terminalagt'
import {
	TerminalAgtESelect,
	TerminalAgtECreateColumns,
	TerminalAgtECreateProperties,
	TerminalAgtEUpdateColumns,
	TerminalAgtEUpdateProperties,
	TerminalAgtEId,
	TerminalAgtECascadeGraph,
	QTerminalAgt
} from './qterminalagt'
import {
	IUser
} from './user'
import {
	UserESelect,
	UserECreateColumns,
	UserECreateProperties,
	UserEUpdateColumns,
	UserEUpdateProperties,
	UserEId,
	UserECascadeGraph,
	QUser
} from './quser'
import {
	IUserTerminal
} from './userterminal'
import {
	UserTerminalESelect,
	UserTerminalECreateColumns,
	UserTerminalECreateProperties,
	UserTerminalEUpdateColumns,
	UserTerminalEUpdateProperties,
	UserTerminalEId,
	UserTerminalECascadeGraph,
	QUserTerminal
} from './quserterminal'
import {
	IUserTerminalAgt
} from './userterminalagt'
import {
	UserTerminalAgtESelect,
	UserTerminalAgtECreateColumns,
	UserTerminalAgtECreateProperties,
	UserTerminalAgtEUpdateColumns,
	UserTerminalAgtEUpdateProperties,
	UserTerminalAgtEId,
	UserTerminalAgtECascadeGraph,
	QUserTerminalAgt
} from './quserterminalagt'


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
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


export interface IBaseAgtDuo
  extends IDuo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt> {
}

export class BaseAgtDuo
  extends SQDIDuo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt>
	implements IBaseAgtDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseTerminalDuo
  extends IDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> {
}

export class BaseTerminalDuo
  extends SQDIDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal>
	implements IBaseTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseTerminalAgtDuo
  extends IDuo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt> {
}

export class BaseTerminalAgtDuo
  extends SQDIDuo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt>
	implements IBaseTerminalAgtDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseUserDuo
  extends IDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> {
}

export class BaseUserDuo
  extends SQDIDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser>
	implements IBaseUserDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseUserTerminalDuo
  extends IDuo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal> {
}

export class BaseUserTerminalDuo
  extends SQDIDuo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal>
	implements IBaseUserTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseUserTerminalAgtDuo
  extends IDuo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt> {
}

export class BaseUserTerminalAgtDuo
  extends SQDIDuo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt>
	implements IBaseUserTerminalAgtDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}
