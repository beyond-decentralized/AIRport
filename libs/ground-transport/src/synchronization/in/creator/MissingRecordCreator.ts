import {TableIndex}                from "@airport/air-control";
import {SchemaVersionId}           from "@airport/ground-control";
import {
	ActorId,
	RecordHistoryActorRecordId,
	RepositoryEntityActorRecordId,
	RepositoryId
}                                  from "@airport/holding-pattern";
import {
	IMissingRecord,
	IMissingRecordDao,
	IMissingRecordRepoTransBlock,
	MissingRecordDaoToken,
	MissingRecordStatus
}                                  from "@airport/moving-walkway";
import {Inject}                    from "typedi";
import {MissingRecordCreatorToken} from "../../../InjectionTokens";
import {IDataToTM}                 from "../SyncInUtils";

export interface IMissingRecordCreator {

}

@Inject(MissingRecordCreatorToken)
export class MissingRecordCreator
	implements IMissingRecordCreator {

	constructor(
		@Inject(MissingRecordDaoToken)
		private missingRecordDao: IMissingRecordDao
	) {
	}

}