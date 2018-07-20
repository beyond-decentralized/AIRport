import { AgtSharingMessageId, TmSharingMessageId } from "@airport/arrivals-n-departures";
import { DataOrigin } from "../..";
import { SharingNode } from "../sharingNode/SharingNode";
import { SharingMessageRepoTransBlock } from "./SharingMessageRepoTransBlock";
export declare type SharingMessageSyncTimestamp = Date;
export declare type SharingMessageDataCache = string;
/**
 * A sharing message is a record of a number of RepositoryTransactionBlocks
 * being sent to or from given AGT.  Other SharingMessages are supported as
 * well.
 *
 * When the data in an incoming SharingMessage isn't ready to be processed
 * because of:
 *  Locally missing schemas
 *  Locally outdated schemas
 *  Locally missing data
 *  Received data needing to be upgraded to latest version of schema
 *
 * Q: Should the entire message be blocked from processing or just the affected
 * RTBs?
 *
 * Entire Message
 * PROs:
 *  All related data is guaranteed to be synced at to local TM at the same time
 *
 * CONs:
 *  Any data that is not related to blocked RTBs is also blocked
 *
 * Just affected RTBs:
 * PROs:
 *  System keeps you as up to date as possible, even though some of the updates
 *  may appear to be partial (across repository boundaries).  However,
 *  it should still be usable as long as a repository represents a given
 *  unit of knowledge that has value by itself.
 *  Not inserting data that can be inserted can itself snowball into not
 *  being able to insert even more data.
 *
 * CONs:
 *  Users get a temporary view of the data that is still out of sync,
 *  just a bit closer to the latest.  However, apps can be notified
 *  that some of the data could not be synced and can handle the scenario
 *  that way.
 *
 * A:  Sync on per RTB level - we want to present the user with
 * the latest possible snapshot of the data.
 */
export declare class SharingMessage {
    id: TmSharingMessageId;
    sharingNode: SharingNode;
    origin: DataOrigin;
    agtSharingMessageId: AgtSharingMessageId;
    syncTimestamp: SharingMessageSyncTimestamp;
    sharingMessageRepoTransBlocks: SharingMessageRepoTransBlock[];
}
