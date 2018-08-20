import {
	IUtils,
	UtilsToken
}                                 from '@airport/air-control'
import {
	Inject,
	Service
}                                 from 'typedi'
import {
	BaseSequenceConsumerDao,
	IBaseSequenceConsumerDao
}                                 from '..'
import {SequenceConsumerDaoToken} from '../InjectionTokens'

export interface IAbstractSequenceConsumerDao {

}

export interface ISequenceConsumerDao
	extends IAbstractSequenceConsumerDao,
					IBaseSequenceConsumerDao {

}

@Service(SequenceConsumerDaoToken)
export class SequenceConsumerDao
	extends BaseSequenceConsumerDao
	implements ISequenceConsumerDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
	}

}