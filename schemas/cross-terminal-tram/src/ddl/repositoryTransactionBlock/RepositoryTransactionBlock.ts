import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                                     from "@airport/air-control";
import {
	RepositoryTransactionBlockContents,
	RepoTransBlockSyncOutcomeType,
	TmRepositoryTransactionBlockId
}                                     from "@airport/arrivals-n-departures";
import {
	Repository,
	RepositoryTransactionHistory,
}                                     from "@airport/holding-pattern";
import {Terminal}                     from '@airport/travel-document-checkpoint'
import {MissingRecordRepoTransBlock}  from "../missingRecord/MissingRecordRepoTransBlock";
import {SharingMessageRepoTransBlock} from "../sharingMessage/SharingMessageRepoTransBlock";
import {SharingNodeRepoTransBlock}    from "../sharingNode/SharingNodeRepoTransBlock";
import {RepoTransBlockSchemaToChange} from "./RepoTransBlockSchemaToChange";

export type RepositoryTransactionBlockHash = string;

// FIXME: SECURITY - ensure that a given RepoTransBlock is processed only once by a given TM
// FIXME: SECURITY - ensure that a given RepoTransBlock is processed only once by a given AGT

/**
 * A block of Repository Transaction Histories.  It's unique and hashable, and hence
 * can be put into a block chain (or, realistically, into a "0-nonce block mesh")
 *
 * Each Repo Trans Hist must be in one and only one Repo Trans Block.  This is easy since
 * a given Repo Trans Block is created from all recent Repo Trans Hists generated for a given
 * repo on a given TM.
 *
 * FIXME: implement 0-nonce block mesh (as part of P2P work):
 *
 * 0-nonce because we don't need computationally intensive "proof of work"
 * one mesh repository
 * mesh consists of per repository chains push a common chain
 * TM has it's own chain that records in what order it was receiving and creating repo trans
 * hists
 * each TM maintains a common chain that represents what a best case scenario chain should look
 * like
 * (sorted by earliest creation time of all repo trans hists on a given block, and additional ids
 * if needed)
 * there can then be a consensus algorithm that would determine when a given common chain is
 * common across the majority of connected nodes.  It can be used to determine sync status
 *
 * There can be another (per repo trans hist) per UTC date chain and another consensus algorithm
 * to determine when a given repo/day is ready to be archived
 *
 * The per-TM chains can also be inspected and compared against known AGT sync timestamps do
 * determine the likelihood of TMs not "excluding" known blocks from their unique chains (and
 * probably used for other purposes as well).
 */

export type RepositoryTransactionBlock_Id = number

@Entity()
@Table({name: "REPOSITORY_TRANSACTION_BLOCKS"})
export class RepositoryTransactionBlock {

	@Id()
	@DbNumber()
	id: RepositoryTransactionBlock_Id;

	@Column({name: "SOURCE_ID"})
	@DbNumber()
	sourceId: TmRepositoryTransactionBlockId;

	// Needed to determine if the block has already been processed
	hash: RepositoryTransactionBlockHash;

	@ManyToOne()
	@JoinColumn({name: "SOURCE_TERMINAL_ID", referencedColumnName: "ID"})
	source: Terminal;

	@ManyToOne()
	@JoinColumn({
		name: "REPOSITORY_ID", referencedColumnName: "ID"
	})
	repository: Repository;

	@Column({name: "SYNC_OUTCOME_TYPE"})
	@DbString()
	syncOutcomeType: RepoTransBlockSyncOutcomeType;

	@DbString()
	contents: RepositoryTransactionBlockContents;

	@OneToMany()
	@JoinColumn({
		name: "REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID", referencedColumnName: "ID"
	})
	repositoryTransactionHistory: RepositoryTransactionHistory[];

	@OneToMany({mappedBy: "repositoryTransactionBlock"})
	sharingNodeRepoTransBlocks: SharingNodeRepoTransBlock[];

	@OneToMany({mappedBy: "repositoryTransactionBlock"})
	sharingMessageRepoTransBlocks: SharingMessageRepoTransBlock[];

	@OneToMany({mappedBy: "repositoryTransactionBlock"})
	missingRecordRepoTransBlocks: MissingRecordRepoTransBlock[];

	@OneToMany({mappedBy: "repositoryTransactionBlock"})
	repoTransBlockSchemasToChange: RepoTransBlockSchemaToChange[];

}
