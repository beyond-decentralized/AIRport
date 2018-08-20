import {
	IUtils,
	UtilsToken
}                               from '@airport/air-control'
import {
	ISequenceBlockDao,
	ISequenceConsumer,
	SequenceBlockDaoToken,
	SequenceConsumerDaoToken,
	SequenceDaoToken
}                               from '@airport/airport-code'
import {
	DbColumn,
	IStoreDriver,
	StoreDriverToken
} from '@airport/ground-control'
import {IDomain}                from '@airport/territory'
import {
	Inject,
	Service
}                               from 'typedi'
import {ISequenceConsumerDao}   from '../../node_modules/@airport/airport-code/lib/dao/SequenceConsumerDao'
import {ISequenceDao}           from '../../node_modules/@airport/airport-code/lib/dao/SequenceDao'
import {SequenceGeneratorToken} from '../InjectionTokens'
import {ISequenceGenerator}     from './SequenceGenerator'

@Service(SequenceGeneratorToken)
export class RealSequenceGenerator
	implements ISequenceGenerator {

	constructor(
		@Inject(StoreDriverToken)
		private storeDriver: IStoreDriver,
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	async init(
		domain: IDomain
	): Promise<void> {
	}

	async generateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]> {

		const sequenceSql = this.storeDriver.getSequenceSql(sequenceName);
		this.storeDriver.findNative('')
		const dbEntity            = dbColumn.propertyColumns[0].property.entity
		return null;
	}

}