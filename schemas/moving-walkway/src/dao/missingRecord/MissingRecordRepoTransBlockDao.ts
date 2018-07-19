import {
	IUtils,
	UtilsToken
}                                            from "@airport/air-control";
import {
	Inject,
	Service
}                                            from "typedi";
import {MissingRecordId}                     from "../../ddl/ddl";
import {
	BaseMissingRecordRepoTransBlockDao,
	IBaseMissingRecordRepoTransBlockDao,
	Q,
	QMissingRecordRepoTransBlock
}                                            from "../../generated/generated";
import {MissingRecordRepoTransBlockDaoToken} from "../../InjectionTokens";

export interface IMissingRecordRepoTransBlockDao
	extends IBaseMissingRecordRepoTransBlockDao {

	deleteWhereMissingRecordIdsIn(
		missingRecordIds: MissingRecordId[]
	): Promise<void>;

}

@Service(MissingRecordRepoTransBlockDaoToken)
export class MissingRecordRepoTransBlockDao
	extends BaseMissingRecordRepoTransBlockDao
	implements IMissingRecordRepoTransBlockDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async deleteWhereMissingRecordIdsIn(
		missingRecordIds: MissingRecordId[]
	): Promise<void> {
		let mrrtb: QMissingRecordRepoTransBlock;
		await this.db.deleteWhere({
			deleteFrom: mrrtb = Q.MissingRecordSharingMessage,
			where: mrrtb.missingRecord.id.in(missingRecordIds)
		});
	}

}