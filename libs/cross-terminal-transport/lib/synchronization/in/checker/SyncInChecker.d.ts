import { ApplicationIndex } from '@airport/ground-control';
import { IRepositoryTransactionBlock, ISharingMessage } from '@airport/moving-walkway';
import { IDataToTM } from '../SyncInUtils';
export interface CheckApplicationsResult {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleApplicationsAndData: IDataToTM[];
    dataMessagesWithIncompatibleApplications: IDataToTM[];
    dataMessagesWithMissingData: IDataToTM[];
    usedApplicationVersionIdSet: Set<ApplicationIndex>;
}
export interface CheckResults {
    sharingMessagesWithCompatibleApplicationsAndData: ISharingMessage[];
    existingRepoTransBlocksWithCompatibleApplicationsAndData: IRepositoryTransactionBlock[];
    dataMessagesWithCompatibleApplications: IDataToTM[];
    dataMessagesWithInvalidData: IDataToTM[];
}
export interface ISyncInChecker {
    checkApplicationsAndDataAndRecordRepoTransBlocks(dataMessages: IDataToTM[]): Promise<CheckResults>;
}
export declare class SyncInChecker implements ISyncInChecker {
    /**
     *
     * @param {IDataToTM[]} dataMessages
     * @returns {Promise<[IDataToTM[] , Map<ApplicationDomainName, Map<ApplicationName, IApplication>>]>}
     *      [
     *          checked messages composed entirely of records from applications with versions
     *   compatible to this TM (it's present state), map of applications used in messages that
     *   have been verified to be in acceptable state for message processing
     *      ]
     */
    checkApplicationsAndDataAndRecordRepoTransBlocks(dataMessages: IDataToTM[]): Promise<CheckResults>;
    /**
     * Application references are to be upgraded for messages with Compatible Applications only. The
     * remaining types of messages are only upgraded when processed
     *
     * 1) Incompatible applications:
     *
     * Missing Application ids cannot be upgraded
     * Application version ids are not yet be upgraded
     *
     * FIXME: when missing applications are retrieved - map application & application version ids to local
     * values FIXME: when messages/or local application are upgraded - map application version ids to
     * local values
     *
     * 2) Data to be upgraded:
     * Application version ids are not yet be upgraded
     * FIXME: when messages are upgraded - map application version ids to local values
     *
     */
    private updateApplicationReferences;
    private updateActorReferences;
    private updateRepositoryReferences;
    private recordRepoTransBlockApplicationToChange;
    private findMatchingApplication;
}
//# sourceMappingURL=SyncInChecker.d.ts.map