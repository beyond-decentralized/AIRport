import { DI } from '@airport/di';
import { TUNNING_SETTINGS } from '../tokens';
export class TuningSettings {
    constructor() {
        this.archiving = {
            numRepositoriesToProcessAtATime: 20
        };
        this.daily = {};
        this.recent = {
            incomingBatchFrequencyMillis: 300000,
            maxIncomingRTBBatchSize: Number.MAX_SAFE_INTEGER,
            maxIncomingSharingMessageBatchSize: Number.MAX_SAFE_INTEGER,
            maxToSaveSyncLogBatchSize: Number.MAX_SAFE_INTEGER,
            minMillisSinceLastConnection: 300000,
        };
    }
}
DI.set(TUNNING_SETTINGS, TuningSettings);
//# sourceMappingURL=TuningSettings.js.map