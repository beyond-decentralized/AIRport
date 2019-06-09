import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {DI}            from '@airport/di'
import {
	DbSchema,
	getSchemaName
}                      from '@airport/ground-control';
import { Sequence } from '../ddl/sequence';
import { QSequence } from './qsequence';
import { SequenceBlock } from '../ddl/sequenceblock';
import { QSequenceBlock } from './qsequenceblock';
import { TerminalRun } from '../ddl/terminalrun';
import { QTerminalRun } from './qterminalrun';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	Sequence: QSequence;
	SequenceBlock: QSequenceBlock;
	TerminalRun: QTerminalRun;

}

const __constructors__ = {
	Sequence: Sequence,
	SequenceBlock: SequenceBlock,
	TerminalRun: TerminalRun
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__,
  domain: 'github.com',
  name: '@airport/airport-code'
};
export const Q: LocalQSchema = Q_SCHEMA

DI.get((
	airportDatabase
) => {
	airportDatabase.QM[getSchemaName(Q_SCHEMA)] = Q
}, AIR_DB)
