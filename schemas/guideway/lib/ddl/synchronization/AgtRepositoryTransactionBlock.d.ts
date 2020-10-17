import { RepositoryTransactionBlockContents, TmRepositoryTransactionBlockId } from '@airport/arrivals-n-departures';
import { Server } from '../..';
import { Repository } from '../repository/Repository';
import { Terminal } from '../terminal/Terminal';
import { TerminalRepository } from '../terminal/TerminalRepository';
import { ArchivingStatus } from './ArchivingStatus';
import { SyncLog } from './SyncLog';
export declare type AgtRepositoryTransactionBlockId = number;
export declare type AgtRepositoryTransactionBlockAddDatetime = number;
export declare type AgtRepositoryTransactionBlockArchivingStatus = ArchivingStatus;
export declare type AgtRepositoryTransactionBlockIsRecent = boolean;
export declare class AgtRepositoryTransactionBlock {
    id: AgtRepositoryTransactionBlockId;
    repository: Repository;
    terminalRepositories: TerminalRepository[];
    terminal: Terminal;
    archivingServer: Server;
    archivingStatus: AgtRepositoryTransactionBlockArchivingStatus;
    addDatetime: AgtRepositoryTransactionBlockAddDatetime;
    tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId;
    /**
     * In transaction data multiple transaction logs may be present and we don't want
     * to ever receive multiple transaction log entries. Possible strategies to accomplish that:
     *
     * a) Keep track of which transactions log entries are in which data records
     *
     * PROS:
     *
     * 1) allows to re-send transaction data without additional computation on TM side
     * 2) allows to re-send one message with additional transaction logs, instead of sending
     * multiple messages
     *
     * CONS:
     *
     * 1) requires more computation and storage on the AGT side.
     * 2) gives AGT knowledge of which and how many transaction log entries are in each
     * message
     *
     *
     * b) Allow for sending multiple transaction data records in the same message
     *
     * PROS:
     *
     * 1) no additional load on AGT
     * 2) no need for AGT know about transaction log entries
     * 3) still allows to resent one message with additional transaction logs
     *
     * CONS:
     *
     * No major CONS.
     *
     * no known const
     *
     */
    contents: RepositoryTransactionBlockContents;
    syncLogs: SyncLog[];
}
//# sourceMappingURL=AgtRepositoryTransactionBlock.d.ts.map