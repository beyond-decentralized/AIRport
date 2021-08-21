export interface ITuningSettings {
    archiving: IArchivingTuningParams;
    daily: IDailyTuningParams;
    recent: IRecentTuningParams;
}
export interface IArchivingTuningParams {
    numRepositoriesToProcessAtATime: number;
}
export interface IDailyTuningParams {
}
export interface IRecentTuningParams {
    incomingBatchFrequencyMillis: number;
    maxIncomingRTBBatchSize: number;
    maxIncomingSharingMessageBatchSize: number;
    maxToSaveSyncLogBatchSize: number;
    minMillisSinceLastConnection: number;
}
export declare class TuningSettings implements ITuningSettings {
    archiving: {
        numRepositoriesToProcessAtATime: number;
    };
    daily: {};
    recent: {
        incomingBatchFrequencyMillis: number;
        maxIncomingRTBBatchSize: number;
        maxIncomingSharingMessageBatchSize: number;
        maxToSaveSyncLogBatchSize: number;
        minMillisSinceLastConnection: number;
    };
}
//# sourceMappingURL=TuningSettings.d.ts.map