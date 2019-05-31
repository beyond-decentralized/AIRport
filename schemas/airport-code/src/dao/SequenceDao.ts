import {DI}           from '@airport/di'
import {SEQUENCE_DAO} from '../diTokens'
import {
	BaseSequenceDao,
	IBaseSequenceDao,
	ISequence,
	SequenceEId
}                     from '../generated/generated'

export interface IAbstractSequenceDao {
}

export interface ISequenceDao
	extends IBaseSequenceDao {

}

export class SequenceDao
	extends BaseSequenceDao
	implements ISequenceDao {
}

DI.set(SEQUENCE_DAO, SequenceDao)
