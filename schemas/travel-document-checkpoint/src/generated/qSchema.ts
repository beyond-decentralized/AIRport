import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {DI}            from '@airport/di'
import {
	DbSchema,
	getSchemaName
}                      from '@airport/ground-control';
import { Agt } from '../ddl/agt';
import { QAgt } from './qagt';
import { Terminal } from '../ddl/terminal';
import { QTerminal } from './qterminal';
import { TerminalAgt } from '../ddl/terminalagt';
import { QTerminalAgt } from './qterminalagt';
import { User } from '../ddl/user';
import { QUser } from './quser';
import { UserTerminal } from '../ddl/userterminal';
import { QUserTerminal } from './quserterminal';
import { UserTerminalAgt } from '../ddl/userterminalagt';
import { QUserTerminalAgt } from './quserterminalagt';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

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
	__constructors__,
  domain: 'github.com',
  name: '@airport/travel-document-checkpoint'
};
export const Q: LocalQSchema = Q_SCHEMA

DI.get((
	airportDatabase
) => {
	airportDatabase.QM[getSchemaName(Q_SCHEMA)] = Q
}, AIR_DB)
