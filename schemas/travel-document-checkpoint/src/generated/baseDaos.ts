import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
import {
	IAgt,
	AgtESelect,
	AgtECreateColumns,
	AgtECreateProperties,
	AgtEUpdateColumns,
	AgtEUpdateProperties,
	AgtEId,
	QAgt
} from './qagt';
import {
	ITerminal,
	TerminalESelect,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	QTerminal
} from './qterminal';
import {
	ITerminalAgt,
	TerminalAgtESelect,
	TerminalAgtECreateColumns,
	TerminalAgtECreateProperties,
	TerminalAgtEUpdateColumns,
	TerminalAgtEUpdateProperties,
	TerminalAgtEId,
	QTerminalAgt
} from './qterminalagt';
import {
	IUser,
	UserESelect,
	UserECreateColumns,
	UserECreateProperties,
	UserEUpdateColumns,
	UserEUpdateProperties,
	UserEId,
	QUser
} from './quser';
import {
	IUserTerminal,
	UserTerminalESelect,
	UserTerminalECreateColumns,
	UserTerminalECreateProperties,
	UserTerminalEUpdateColumns,
	UserTerminalEUpdateProperties,
	UserTerminalEId,
	QUserTerminal
} from './quserterminal';
import {
	IUserTerminalAgt,
	UserTerminalAgtESelect,
	UserTerminalAgtECreateColumns,
	UserTerminalAgtECreateProperties,
	UserTerminalAgtEUpdateColumns,
	UserTerminalAgtEUpdateProperties,
	UserTerminalAgtEId,
	QUserTerminalAgt
} from './quserterminalagt';


export interface IBaseAgtDao
  extends IDao<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, QAgt> {
}

export class BaseAgtDao
  extends Dao<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, QAgt>
	implements IBaseAgtDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Agt'], Q)
	}
}


export interface IBaseTerminalDao
  extends IDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}

export class BaseTerminalDao
  extends Dao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, QTerminal>
	implements IBaseTerminalDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Terminal'], Q)
	}
}


export interface IBaseTerminalAgtDao
  extends IDao<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt> {
}

export class BaseTerminalAgtDao
  extends Dao<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt>
	implements IBaseTerminalAgtDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TerminalAgt'], Q)
	}
}


export interface IBaseUserDao
  extends IDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, QUser> {
}

export class BaseUserDao
  extends Dao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, QUser>
	implements IBaseUserDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['User'], Q)
	}
}


export interface IBaseUserTerminalDao
  extends IDao<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal> {
}

export class BaseUserTerminalDao
  extends Dao<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal>
	implements IBaseUserTerminalDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['UserTerminal'], Q)
	}
}


export interface IBaseUserTerminalAgtDao
  extends IDao<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt> {
}

export class BaseUserTerminalAgtDao
  extends Dao<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt>
	implements IBaseUserTerminalAgtDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['UserTerminalAgt'], Q)
	}
}
