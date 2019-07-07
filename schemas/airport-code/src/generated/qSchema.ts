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
import { Sequence } from '../ddl/sequence';
import { QSequence } from './qsequence';
import { TerminalRun } from '../ddl/terminalrun';
import { QTerminalRun } from './qterminalrun';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	Sequence: QSequence;
	TerminalRun: QTerminalRun;

}

const __constructors__ = {
	Sequence: Sequence,
	TerminalRun: TerminalRun
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__,
  domain: 'npmjs.org',
  name: '@airport/airport-code'
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
