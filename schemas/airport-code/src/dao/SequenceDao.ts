import { plus } from '@airport/air-control'
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { SEQUENCE_DAO } from '../tokens'
import {
	BaseSequenceDao,
	IBaseSequenceDao,
	Q
} from '../generated/generated'

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
		return Q.__dbApplication__ && Q.__dbApplication__.currentVersion[0]
			.applicationVersion.entities[0]
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

DEPENDENCY_INJECTION.set(SEQUENCE_DAO, SequenceDao)
