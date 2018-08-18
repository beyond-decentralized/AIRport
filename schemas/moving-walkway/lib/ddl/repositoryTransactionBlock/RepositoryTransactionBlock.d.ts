import { RepositoryTransactionBlockContents, RepoTransBlockSyncOutcomeType, TmRepositoryTransactionBlockId } from "@airport/arrivals-n-departures";
import { Repository, RepositoryTransactionHistory } from "@airport/holding-pattern";
import { Terminal } from '@airport/travel-document-checkpoint';
import { MissingRecordRepoTransBlock } from "../missingRecord/MissingRecordRepoTransBlock";
import { SharingMessageRepoTransBlock } from "../sharingMessage/SharingMessageRepoTransBlock";
import { SharingNodeRepoTransBlock } from "../sharingNode/SharingNodeRepoTransBlock";
import { RepoTransBlockSchemaToChange } from "./RepoTransBlockSchemaToChange";
export declare type RepositoryTransactionBlockHash = string;
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
export declare class RepositoryTransactionBlock {
    id: TmRepositoryTransactionBlockId;
    sourceId: TmRepositoryTransactionBlockId;
    hash: RepositoryTransactionBlockHash;
    source: Terminal;
    repository: Repository;
    syncOutcomeType: RepoTransBlockSyncOutcomeType;
    contents: RepositoryTransactionBlockContents;
    repositoryTransactionHistory: RepositoryTransactionHistory[];
    sharingNodeRepoTransBlocks: SharingNodeRepoTransBlock[];
    sharingMessageRepoTransBlocks: SharingMessageRepoTransBlock[];
    missingRecordRepoTransBlocks: MissingRecordRepoTransBlock[];
    repoTransBlockSchemasToChange: RepoTransBlockSchemaToChange[];
}
