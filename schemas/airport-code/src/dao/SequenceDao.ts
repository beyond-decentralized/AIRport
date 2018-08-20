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
	IBaseSequenceDao
}                         from '..'
import {SequenceDaoToken} from '../InjectionTokens'

export interface IAbstractSequenceDao {

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