import {DI}                          from '@airport/di'
import {SYNC_IN_CONSISTENCY_CHECKER} from '../../../tokens'
import {IDataToTM}                   from '../SyncInUtils'

export interface ISyncInConsistencyChecker {

}

// const log = GROUND_TRANSPORT_LOGGER.add("SyncInConsistencyChecker");

export class SyncInConsistencyChecker
	implements ISyncInConsistencyChecker {


	ensureConsistency(
		message: IDataToTM
	) {

	}

	private isRepositoryConsistent(): boolean {

	}

	private areActorsConsistent(
		message: IDataToTM
	): boolean {

	}

	private areApplicationsConsistent(): boolean {

	}

}

DI.set(SYNC_IN_CONSISTENCY_CHECKER, SyncInConsistencyChecker)
