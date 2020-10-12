import {plus}         from '@airport/air-control'
import {DI}           from '@airport/di'
import {SEQUENCE_DAO} from '../tokens'
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

	async incrementSequence(): Promise<void> {
		const s = Q.Sequence
		await this.db.updateWhere({
			update: s,
			set: {
				currentValue: plus(s.currentValue, s.incrementBy)
			}
		})
	}

}

DI.set(SEQUENCE_DAO, SequenceDao)
