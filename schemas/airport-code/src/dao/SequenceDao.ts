import {plus}         from '@airport/air-control'
import {DI}           from '@airport/di'
import {DbSequence}   from '@airport/ground-control/lib/src'
import {SEQUENCE_DAO} from '../diTokens'
import {
	BaseSequenceDao,
	IBaseSequenceDao,
	Q
}                     from '../generated/generated'

export interface IAbstractSequenceDao {
}

export interface ISequenceDao
	extends IBaseSequenceDao {

	incrementCurrentValues(): Promise<void>
}

export class SequenceDao
	extends BaseSequenceDao
	implements ISequenceDao {

	static diSet(): boolean {
		return Q.__dbSchema__ && Q.__dbSchema__
			.currentVersion.entities[0]
	}

	async incrementCurrentValues(): Promise<void> {
		const s = Q.Sequence
		await this.db.updateWhere({
			update: s,
			set: {
				currentValue: plus(s.currentValue, s.incrementBy)
			}
		})
	}

	async updateCurrentValue(
		sequence: DbSequence,
		numNewSequencesNeeded: number
	): Promise<void>

}

DI.set(SEQUENCE_DAO, SequenceDao)
