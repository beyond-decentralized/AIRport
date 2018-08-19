import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { Sequence } from '../ddl/sequence';
import { QSequence } from './qsequence';
import { SequenceBlock } from '../ddl/sequenceblock';
import { QSequenceBlock } from './qsequenceblock';
import { SequenceConsumer } from '../ddl/sequenceconsumer';
import { QSequenceConsumer } from './qsequenceconsumer';

import {
	IBaseSequenceDmo,
	IBaseSequenceBlockDmo,
	IBaseSequenceConsumerDmo
} from './baseDmos';

import {
	IBaseSequenceDao,
	IBaseSequenceBlockDao,
	IBaseSequenceConsumerDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		Sequence: IBaseSequenceDmo;
		SequenceBlock: IBaseSequenceBlockDmo;
		SequenceConsumer: IBaseSequenceConsumerDmo;
	}

	dao: {
		Sequence: IBaseSequenceDao;
		SequenceBlock: IBaseSequenceBlockDao;
		SequenceConsumer: IBaseSequenceConsumerDao;
	}
	
	Sequence: QSequence;
	SequenceBlock: QSequenceBlock;
	SequenceConsumer: QSequenceConsumer;

}

const __constructors__ = {
	Sequence: Sequence,
	SequenceBlock: SequenceBlock,
	SequenceConsumer: SequenceConsumer
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
