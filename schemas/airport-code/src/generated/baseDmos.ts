import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { Q } from './qSchema';
import {
	ISequence,
	SequenceESelect,
	SequenceECreateColumns,
	SequenceECreateProperties,
	SequenceEUpdateColumns,
	SequenceEUpdateProperties,
	SequenceEId,
	QSequence
} from './qsequence';
import {
	ISequenceBlock,
	SequenceBlockESelect,
	SequenceBlockECreateColumns,
	SequenceBlockECreateProperties,
	SequenceBlockEUpdateColumns,
	SequenceBlockEUpdateProperties,
	SequenceBlockEId,
	QSequenceBlock
} from './qsequenceblock';
import {
	ISequenceConsumer,
	SequenceConsumerESelect,
	SequenceConsumerECreateColumns,
	SequenceConsumerECreateProperties,
	SequenceConsumerEUpdateColumns,
	SequenceConsumerEUpdateProperties,
	SequenceConsumerEId,
	QSequenceConsumer
} from './qsequenceconsumer';


export interface IBaseSequenceDmo
  extends IDmo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> {
}

export class BaseSequenceDmo
  extends Dmo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence>
	implements IBaseSequenceDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Sequence']);
	}
}


export interface IBaseSequenceBlockDmo
  extends IDmo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}

export class BaseSequenceBlockDmo
  extends Dmo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock>
	implements IBaseSequenceBlockDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SequenceBlock']);
	}
}


export interface IBaseSequenceConsumerDmo
  extends IDmo<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> {
}

export class BaseSequenceConsumerDmo
  extends Dmo<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer>
	implements IBaseSequenceConsumerDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SequenceConsumer']);
	}
}
