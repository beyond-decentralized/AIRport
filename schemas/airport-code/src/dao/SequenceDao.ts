import { PLUS } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import {
	BaseSequenceDao,
	IBaseSequenceDao
} from '../generated/baseDaos'
import Q from '../generated/qApplication'


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
		return Q.__dbApplication__ && !!Q.__dbApplication__.currentVersion[0]
			.applicationVersion.entities[0]
	}

	async incrementCurrentValues(
		context: IContext
	): Promise<void> {
		const s =this.qSchema.Sequence
		await this.db.updateWhere({
			UPDATE: s,
			SET: {
				currentValue: PLUS(s.currentValue, s.incrementBy)
			}
		}, context)
	}

	async incrementSequence(
		context: IContext
	): Promise<void> {
		const s = this.qSchema.Sequence
		await this.db.updateWhere({
			UPDATE: s,
			SET: {
				currentValue: PLUS(s.currentValue, s.incrementBy)
			}
		}, context)
	}

}
