import {DI}           from '@airport/di'
import {SEQUENCE_DAO} from '../diTokens'
import {
	BaseSequenceDao,
	IBaseSequenceDao,
	ISequence,
	SequenceEId
}                     from '../generated/generated'

export interface IAbstractSequenceDao {

	findAll(
		entityIds?: SequenceEId[]
	): Promise<ISequence[]>;

}

export interface ISequenceDao
	extends IAbstractSequenceDao,
	        IBaseSequenceDao {

}

export class SequenceDao
	extends BaseSequenceDao
	implements ISequenceDao {
}

DI.set(SEQUENCE_DAO, SequenceDao)