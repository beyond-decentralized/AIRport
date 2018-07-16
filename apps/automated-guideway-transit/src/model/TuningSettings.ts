import {Service}              from "typedi/decorators/Service";
import {TunningSettingsToken} from "../InjectionTokens";

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


@Service(TunningSettingsToken)
export class TuningSettings
	implements ITuningSettings {

	archiving = {
		numRepositoriesToProcessAtATime: 20
	};

	daily = {};

	recent = {
		incomingBatchFrequencyMillis: 300000,
		maxIncomingRTBBatchSize: Number.MAX_SAFE_INTEGER,
		maxIncomingSharingMessageBatchSize: Number.MAX_SAFE_INTEGER,
		maxToSaveSyncLogBatchSize: Number.MAX_SAFE_INTEGER,
		minMillisSinceLastConnection: 300000,
	};

}