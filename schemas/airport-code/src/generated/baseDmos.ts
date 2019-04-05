import {
	IDmo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control';
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


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDmo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Dmo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	static diSet(): boolean {
		return Q.db as any
	}

	constructor(
		dbEntityName: string
	) {
		super(dbEntityName, Q)
	}
}


export interface IBaseSequenceDmo
  extends IDmo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> {
}

export class BaseSequenceDmo
  extends SQDIDmo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence>
	implements IBaseSequenceDmo {
	constructor() {
		super('Sequence');
	}
}


export interface IBaseSequenceBlockDmo
  extends IDmo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}

export class BaseSequenceBlockDmo
  extends SQDIDmo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock>
	implements IBaseSequenceBlockDmo {
	constructor() {
		super('SequenceBlock');
	}
}


export interface IBaseSequenceConsumerDmo
  extends IDmo<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> {
}

export class BaseSequenceConsumerDmo
  extends SQDIDmo<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer>
	implements IBaseSequenceConsumerDmo {
	constructor() {
		super('SequenceConsumer');
	}
}
