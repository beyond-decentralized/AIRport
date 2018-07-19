import {
	field,
	IUtils,
	UtilsToken
}                             from "@airport/air-control";
import {AirportDatabaseToken} from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase}     from "@airport/air-control/lib/lingo/AirportDatabase";
import {
	QRepositoryTransactionHistory,
	RepositoryTransactionHistoryBlockId,
	RepositoryTransactionHistoryId
}                             from "@airport/holding-pattern";
import {
	Inject,
	Service
}                             from "typedi";
import {
	BaseRepositoryTransactionHistoryUpdateStageDao,
	IBaseRepositoryTransactionHistoryUpdateStageDao,
	QRepositoryTransactionHistoryUpdateStage,
	RepositoryTransactionHistoryUpdateStageDaoToken
}                             from "../..";
import {Q}                    from "../../generated/generated";

export type RepositoryTransactionHistoryUpdateStageValues = [
	RepositoryTransactionHistoryId,
	RepositoryTransactionHistoryBlockId
	];

export interface IRepositoryTransactionHistoryUpdateStageDao
	extends IBaseRepositoryTransactionHistoryUpdateStageDao {

	insertValues(
		values: RepositoryTransactionHistoryUpdateStageValues[]
	): Promise<number>;

	updateRepositoryTransactionHistory(): Promise<number>;

	delete( //
	): Promise<number>;

}

@Service(RepositoryTransactionHistoryUpdateStageDaoToken)
export class RepositoryTransactionHistoryUpdateStageDao
	extends BaseRepositoryTransactionHistoryUpdateStageDao
	implements IRepositoryTransactionHistoryUpdateStageDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async insertValues(
		values: RepositoryTransactionHistoryUpdateStageValues[]
	): Promise<number> {

		const dbEntity = Q.db.currentVersion.entityMapByName.RepositoryTransactionHistoryUpdateStage;

		let rthus: QRepositoryTransactionHistoryUpdateStage;

		return await this.airportDb.db.insertValues(dbEntity, {
			insertInto: rthus = Q.RepositoryTransactionHistoryUpdateStage,
			columns: [
				rthus.repositoryTransactionHistoryId,
				rthus.blockId
			],
			values
		});
	}

	async updateRepositoryTransactionHistory(): Promise<number> {
		const schemaName = '@airport/holding-pattern';
		const dbEntity = this.airportDb.schemaMapByName[schemaName]
			.currentVersion.entityMapByName['RepositoryTransactionHistory'];
		const rth: QRepositoryTransactionHistory
			= this.airportDb.qSchemaMapByName[schemaName].RepositoryTransactionHistory;
		let rthus: QRepositoryTransactionHistoryUpdateStage;

		return await this.airportDb.db.updateWhere(dbEntity, {
			update: rth,
			set: {
				blockId: field({
					from: [
						rthus = Q.RepositoryTransactionHistoryUpdateStage
					],
					select: rthus.blockId,
					where: rthus.repositoryTransactionHistoryId.equals(rth.id)
				})
			}
		});
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			deleteFrom: Q.RepositoryTransactionHistoryUpdateStage
		});
	}

}