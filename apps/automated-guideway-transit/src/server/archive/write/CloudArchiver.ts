import {AgtRepositoryId,}   from '@airport/arrivals-n-departures'
import {
	AgtRepositoryTransactionBlockAddDatetime,
	AgtRepositoryTransactionBlockId,
	DailyArchiveLogValues
}                           from '@airport/guideway'
import {DailyArchiveValues} from '@airport/point-of-destination'

export interface ICloudArchiver {
	archive(
		dailyArchiveDtos: DailyArchiveValues[],
		dailyArchiveLogValues: DailyArchiveLogValues[],
		onDate: AgtRepositoryTransactionBlockAddDatetime,
	): Promise<[AgtRepositoryTransactionBlockId[], DailyArchiveLogValues[], AgtRepositoryId[]]>;
}

export class CloudArchiver
	implements ICloudArchiver {

	// TODO: shift out any records that could not be archived at this time
	async archive(
		dailyArchiveDtos: DailyArchiveValues[],
		dailyArchiveLogValues: DailyArchiveLogValues[],
		onDate: AgtRepositoryTransactionBlockAddDatetime,
	): Promise<[AgtRepositoryTransactionBlockId[], DailyArchiveLogValues[], AgtRepositoryId[]]> {
		throw new Error(`Not implemented`)
	}


}
