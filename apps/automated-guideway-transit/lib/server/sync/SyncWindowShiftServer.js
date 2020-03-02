"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
export class RecentWindowShiftServer
    implements IRecentWindowShiftServer {

    constructor(
        private agtRepositoryTransactionBlockDao: IAgtRepositoryTransactionBlockDao,
    ) {
    }

    startShiftingRecentWindows(
        setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer,
        intervalFrequencyMillis: number,
        windowSizeInMillis: number,
    ): void {
        setInterval(() => {
            this.shiftRealtimeWindow(windowSizeInMillis).then();
        }, intervalFrequencyMillis);
    }

    async shiftRealtimeWindow(
        windowSizeInMillis: number
    ): Promise<void> {
        const windowStartTime: Date = new Date(new Date().getTime() - windowSizeInMillis);
        const fromDate: AgtRepositoryTransactionBlockAddDatetime = Date.UTC(windowStartTime.getUTCFullYear(),
            windowStartTime.getUTCMonth(), windowStartTime.getUTCDate());
        await this.agtRepositoryTransactionBlockDao.shiftRealtimeWindow(fromDate, windowStartTime.getTime());
    }

}
*/
//# sourceMappingURL=SyncWindowShiftServer.js.map