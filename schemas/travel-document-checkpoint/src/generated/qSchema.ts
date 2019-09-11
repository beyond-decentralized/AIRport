import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
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
  domain: 'npmjs.org',
  name: '@airport/travel-document-checkpoint'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbSchema__, dbEntityId)
}

DI.get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
