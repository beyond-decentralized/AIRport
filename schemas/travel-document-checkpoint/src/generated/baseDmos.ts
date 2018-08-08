import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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


export interface IBaseAgtDmo
  extends IDmo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt> {
}

export class BaseAgtDmo
  extends Dmo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt>
	implements IBaseAgtDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Agt']);
	}
}


export interface IBaseTerminalDmo
  extends IDmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}

export class BaseTerminalDmo
  extends Dmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal>
	implements IBaseTerminalDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Terminal']);
	}
}


export interface IBaseTerminalAgtDmo
  extends IDmo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt> {
}

export class BaseTerminalAgtDmo
  extends Dmo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt>
	implements IBaseTerminalAgtDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TerminalAgt']);
	}
}


export interface IBaseUserDmo
  extends IDmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}

export class BaseUserDmo
  extends Dmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser>
	implements IBaseUserDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['User']);
	}
}


export interface IBaseUserTerminalDmo
  extends IDmo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal> {
}

export class BaseUserTerminalDmo
  extends Dmo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal>
	implements IBaseUserTerminalDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['UserTerminal']);
	}
}


export interface IBaseUserTerminalAgtDmo
  extends IDmo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt> {
}

export class BaseUserTerminalAgtDmo
  extends Dmo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt>
	implements IBaseUserTerminalAgtDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['UserTerminalAgt']);
	}
}
