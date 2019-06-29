import {DI}           from '@airport/di'
import {SEQUENCE_DAO} from '../diTokens'
import {
	BaseSequenceDao,
	IBaseSequenceDao,
	ISequence,
	Q,
	SequenceEId
} from '../generated/generated'

export interface IAbstractSequenceDao {
}

export interface ISequenceDao
	extends IBaseSequenceDao {

}

export class SequenceDao
	extends BaseSequenceDao
	implements ISequenceDao {

	static diSet(): boolean {
		return Q.__dbSchema__ && Q.__dbSchema__
			.currentVersion.entities[0]
	}

}

DI.set(SEQUENCE_DAO, SequenceDao)
