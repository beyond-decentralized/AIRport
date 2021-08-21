import { ISyncRecordDao, SyncRecordAddDatetime } from "@airport/guideway";

export interface IRealtimeWindowShiftServer {

	startShiftingRealtimeWindows(
		setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer,
		intervalFrequencyMillis: number,
		windowSizeInMillis: number,
	): void;

}

export class RealtimeWindowShiftServer
	implements IRealtimeWindowShiftServer {

	constructor(
		private syncRecordDao: ISyncRecordDao,
	) {
	}

	startShiftingRealtimeWindows(
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
		const fromDate: SyncRecordAddDatetime = Date.UTC(windowStartTime.getUTCFullYear(),
			windowStartTime.getUTCMonth(), windowStartTime.getUTCDate());
		await this.syncRecordDao.shiftRealtimeWindow(fromDate, windowStartTime.getTime());
	}

}