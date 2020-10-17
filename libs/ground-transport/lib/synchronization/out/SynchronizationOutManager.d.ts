import { ISharingNode } from '@airport/moving-walkway';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ISynchronizationOutManager {
    synchronize(sharingNodes: ISharingNode[], terminal: ITerminal): Promise<void>;
}
/**
 * Synchronization manager is in charge of maintaining the AIR Terminal in sync.
 *
 * Any number of sync nodes can be configured to communicate
 * over any periods of time.  At any given point in time all pending Repository
 * Transaction Log entries
 *
 */
export declare class SynchronizationOutManager implements ISynchronizationOutManager {
    synchronize(sharingNodes: ISharingNode[], terminal: ITerminal): Promise<void>;
    /**
     *
     * @param {SharingNodeId[]} sharingNodeIds
     * @returns {Promise<void>}
     */
    private getNotAcknowledgedRTBs;
    /**
     * Unfinished messages get merged into new messages
     */
    private updateUnsyncedSharingMessages;
    /**
     * Once an RTB has beens successfuly synced it's serialied data should be dropped.
     */
    private clearDataOfSuccessfullySyncedRTBS;
    private addNewSharingMessages;
}
//# sourceMappingURL=SynchronizationOutManager.d.ts.map