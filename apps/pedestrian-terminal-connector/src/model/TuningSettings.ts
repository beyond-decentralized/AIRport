export interface ITuningSettings {
	archiving: IArchivingTuningParams;
	realtime: IRealtimeTuningParams;
	recent: IRealtimeTuningParams;
}

export interface IArchivingTuningParams {
	numRepositoriesToProcessAtATime: number;
	numSyncRecordsToReturnInCursor: number;
}

export interface IRealtimeTuningParams {
	numSyncRecordsToReturnInCursor: number;
	processingIntervalFrequencyMillis: number;
}

export interface IRecentTuningParams {
	numSyncRecordsToReturnInCursor: number;
}