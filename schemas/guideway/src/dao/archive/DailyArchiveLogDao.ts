import {IUtils}                 from "@airport/air-control";
import {
	AirportDatabaseToken,
	UtilsToken
}                               from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase}       from "@airport/air-control/lib/lingo/AirportDatabase";
import {Inject}                 from "typedi/decorators/Inject";
import {Service}                from "typedi/decorators/Service";
import {DailyArchiveLogValues,} from "../../ddl/ddl";
import {
	BaseDailyArchiveLogDao,
	Q,
	QDailyArchiveLog
}                               from "../../generated/generated"
import {DailyArchiveLogDaoToken} from "../../InjectionTokens";

export interface IDailyArchiveLogDao {

	insertValues(
		dailyArchiveLogValues: DailyArchiveLogValues[]
	): Promise<number>;

}

@Service(DailyArchiveLogDaoToken)
export class DailyArchiveLogDao
	extends BaseDailyArchiveLogDao
	implements IDailyArchiveLogDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
		utils: IUtils
	) {
		super(utils);
	}

	async insertValues(
		values: DailyArchiveLogValues[]
	): Promise<number> {
		const dbEntity = Q.db.currentVersion.entityMapByName.DailyArchiveLog;

		let dal: QDailyArchiveLog;

		return await this.airportDb.db.insertValues(dbEntity, {
			insertInto: dal = Q.DailyArchiveLog,
			columns: [
				dal.repository.id,
				dal.dateNumber,
				dal.numberOfChanges
			],
			values
		});
	}

}