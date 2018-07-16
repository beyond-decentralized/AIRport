import {
	Entity,
	JoinColumn,
	ManyToOne,
	Table
}                                    from "@airport/air-control";
import {IMissingRecord,}             from "../../generated/missingRecord/qmissingrecord";
import {IRepositoryTransactionBlock} from "../../generated/repositoryTransactionBlock/qrepositorytransactionblock";

@Entity()
@Table({name: "MISSING_RECORD_REPO_TRANS_BLOCKS"})
export class MissingRecordRepoTransBlock {

	@ManyToOne()
	@JoinColumn({name: "MISSING_RECORD_ID", referencedColumnName: "ID"})
	missingRecord: IMissingRecord;

	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_TRANSACTION_BLOCK_ID", referencedColumnName: "ID"})
	repositoryTransactionBlock: IRepositoryTransactionBlock;

}