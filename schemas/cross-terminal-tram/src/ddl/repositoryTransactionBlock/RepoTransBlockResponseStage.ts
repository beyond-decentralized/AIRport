import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	Table
} from "@airport/air-control";
import {
	RepoTransBlockSyncOutcomeType,
	TmRepositoryTransactionBlockId
} from "@airport/arrivals-n-departures";

@Entity()
@Table({name: "REPO_TRANS_BLOCK_RESPONSE_STAGE"})
export class RepoTransBlockResponseStage {

	@Id()
	@DbNumber()
	id: TmRepositoryTransactionBlockId;

	// @Column({name: "AGT_SYNC_RECORD_ID"})
	// @DbNumber()
	// agtSyncRecordId: AgtSyncRecordId;

	@Column({name: "SYNC_OUTCOME_TYPE"})
	@DbString()
	syncOutcomeType: RepoTransBlockSyncOutcomeType;

}