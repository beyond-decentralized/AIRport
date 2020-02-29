import {DI}               from '@airport/di'
import {TUNNING_SETTINGS} from '../tokens'

export interface ITuningSettings {
	archiving: IArchivingTuningParams;
	daily: IDailyTuningParams;
	recent: IRecentTuningParams;
}

export interface IArchivingTuningParams {
	numRepositoriesToProcessAtATime: number;
	// numRepoTransBlocksToReturnInCursor: number;
}

export interface IDailyTuningParams {
	// numRepoTransBlocksToReturnInCursor: number;
}

export interface IRecentTuningParams {
	incomingBatchFrequencyMillis: number;
	// numRepoTransBlocksToReturnInCursor: number;
	maxIncomingRTBBatchSize: number;
	maxIncomingSharingMessageBatchSize: number;
	maxToSaveSyncLogBatchSize: number;
	minMillisSinceLastConnection: number;
}


export class TuningSettings
	implements ITuningSettings {

	archiving = {
		numRepositoriesToProcessAtATime: 20
	}

	daily = {}

	recent = {
		incomingBatchFrequencyMillis: 300000,
		maxIncomingRTBBatchSize: Number.MAX_SAFE_INTEGER,
		maxIncomingSharingMessageBatchSize: Number.MAX_SAFE_INTEGER,
		maxToSaveSyncLogBatchSize: Number.MAX_SAFE_INTEGER,
		minMillisSinceLastConnection: 300000,
	}

}

DI.set(TUNNING_SETTINGS, TuningSettings)
