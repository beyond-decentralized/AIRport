import {
	IUtils,
	UtilsToken
}                         from '@airport/air-control'
import {
	Inject,
	Service
}                         from 'typedi'
import {
	BaseSequenceDao,
	IBaseSequenceDao,
	ISequence,
	SequenceEId
} from '..'
import {SequenceDaoToken} from '../InjectionTokens'

export interface IAbstractSequenceDao {

	findAll(
		entityIds?: SequenceEId[]
	): Promise<ISequence[]>;

}

export interface ISequenceDao
	extends IAbstractSequenceDao,
					IBaseSequenceDao {

}

@Service(SequenceDaoToken)
export class SequenceDao
	extends BaseSequenceDao
	implements ISequenceDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
	}

}