import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
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


export interface IBaseSequenceDao
  extends IDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence> {
}

export class BaseSequenceDao
  extends Dao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence>
	implements IBaseSequenceDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Sequence'], Q, utils);
	}
}


export interface IBaseSequenceBlockDao
  extends IDao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}

export class BaseSequenceBlockDao
  extends Dao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock>
	implements IBaseSequenceBlockDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SequenceBlock'], Q, utils);
	}
}


export interface IBaseSequenceConsumerDao
  extends IDao<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateColumns, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> {
}

export class BaseSequenceConsumerDao
  extends Dao<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateColumns, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer>
	implements IBaseSequenceConsumerDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SequenceConsumer'], Q, utils);
	}
}
