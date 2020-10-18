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
import { QAgt } from './qagt';
import { QTerminal } from './qterminal';
import { QTerminalAgt } from './qterminalagt';
import { QUser } from './quser';
import { QUserTerminal } from './quserterminal';
import { QUserTerminalAgt } from './quserterminalagt';
import {
  Agt,
  Terminal,
  TerminalAgt,
  User,
  UserTerminal,
  UserTerminalAgt
} from '../ddl/ddl';

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
  domain: 'air',
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

DI.db().get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
