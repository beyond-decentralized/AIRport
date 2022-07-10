import { plus } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import {
	BaseSequenceDao,
	IBaseSequenceDao,
	Q
} from '../generated/generated'

export interface IAbstractSequenceDao {
}

export interface ISequenceDao
	extends IBaseSequenceDao {

	incrementCurrentValues(
		context: IContext
	): Promise<void>
}

@Injected()
export class SequenceDao
	extends BaseSequenceDao
	implements ISequenceDao {

	static diSet(): boolean {
		return Q.__dbApplication__ && Q.__dbApplication__.currentVersion[0]
			.applicationVersion.entities[0]
	}

	async incrementCurrentValues(
		context: IContext
	): Promise<void> {
		const s = Q.Sequence
		await this.db.updateWhere({
			update: s,
			set: {
				currentValue: plus(s.currentValue, s.incrementBy)
			}
		}, context)
	}

	async incrementSequence(
		context: IContext
	): Promise<void> {
		const s = Q.Sequence
		await this.db.updateWhere({
			update: s,
			set: {
				currentValue: plus(s.currentValue, s.incrementBy)
			}
		}, context)
	}

}
