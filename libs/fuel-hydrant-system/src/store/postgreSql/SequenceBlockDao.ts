import {
	IAbstractSequenceBlockDao,
	ISequenceBlock,
	SequenceBlockDaoToken
} from '@airport/airport-code'
import {Service} from 'typedi'

@Service(SequenceBlockDaoToken)
export class SequenceBlockDao
	implements IAbstractSequenceBlockDao {

	createNewBlocks(sequenceBlocks: ISequenceBlock[]): Promise<ISequenceBlock[]> {
		return undefined
	}

}