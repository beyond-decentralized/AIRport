import {
	IDuo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control';
import { Duo } from "@airport/check-in";
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
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Duo<Entity,
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


export interface IBaseSequenceDuo
  extends IDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> {
}

export class BaseSequenceDuo
  extends SQDIDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence>
	implements IBaseSequenceDuo {
	constructor() {
		super('Sequence');
	}
}


export interface IBaseSequenceBlockDuo
  extends IDuo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}

export class BaseSequenceBlockDuo
  extends SQDIDuo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock>
	implements IBaseSequenceBlockDuo {
	constructor() {
		super('SequenceBlock');
	}
}


export interface IBaseSequenceConsumerDuo
  extends IDuo<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer> {
}

export class BaseSequenceConsumerDuo
  extends SQDIDuo<ISequenceConsumer, SequenceConsumerESelect, SequenceConsumerECreateProperties, SequenceConsumerEUpdateProperties, SequenceConsumerEId, QSequenceConsumer>
	implements IBaseSequenceConsumerDuo {
	constructor() {
		super('SequenceConsumer');
	}
}
