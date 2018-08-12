import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { Agt } from '../ddl/Agt';
import { QAgt } from './qagt';
import { Terminal } from '../ddl/Terminal';
import { QTerminal } from './qterminal';
import { TerminalAgt } from '../ddl/TerminalAgt';
import { QTerminalAgt } from './qterminalagt';
import { User } from '../ddl/User';
import { QUser } from './quser';
import { UserTerminal } from '../ddl/UserTerminal';
import { QUserTerminal } from './quserterminal';
import { UserTerminalAgt } from '../ddl/UserTerminalAgt';
import { QUserTerminalAgt } from './quserterminalagt';

import {
	IBaseAgtDmo,
	IBaseTerminalDmo,
	IBaseTerminalAgtDmo,
	IBaseUserDmo,
	IBaseUserTerminalDmo,
	IBaseUserTerminalAgtDmo
} from './baseDmos';

import {
	IBaseAgtDao,
	IBaseTerminalDao,
	IBaseTerminalAgtDao,
	IBaseUserDao,
	IBaseUserTerminalDao,
	IBaseUserTerminalAgtDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		Agt: IBaseAgtDmo;
		Terminal: IBaseTerminalDmo;
		TerminalAgt: IBaseTerminalAgtDmo;
		User: IBaseUserDmo;
		UserTerminal: IBaseUserTerminalDmo;
		UserTerminalAgt: IBaseUserTerminalAgtDmo;
	}

	dao: {
		Agt: IBaseAgtDao;
		Terminal: IBaseTerminalDao;
		TerminalAgt: IBaseTerminalAgtDao;
		User: IBaseUserDao;
		UserTerminal: IBaseUserTerminalDao;
		UserTerminalAgt: IBaseUserTerminalAgtDao;
	}
	
	Agt: QAgt;
	Terminal: QTerminal;
	TerminalAgt: QTerminalAgt;
	User: QUser;
	UserTerminal: QUserTerminal;
	UserTerminalAgt: QUserTerminalAgt;

}

const __constructors__ = {
	Agt: Agt,
	Terminal: Terminal,
	TerminalAgt: TerminalAgt,
	User: User,
	UserTerminal: UserTerminal,
	UserTerminalAgt: UserTerminalAgt
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;