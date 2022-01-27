import { container, DI } from '@airport/di';
import { MISSING_RECORD_REPO_TRANS_BLOCK_DAO, REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO, ApplicationChangeStatus, SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO } from '@airport/moving-walkway';
import { SYNC_IN_ACTOR_CHECKER, SYNC_IN_CHECKER, SYNC_IN_DATA_CHECKER, SYNC_IN_REPO_CHECKER, SYNC_IN_REPO_TRANS_BLOCK_CREATOR, SYNC_IN_SCHEMA_CHECKER } from '../../../tokens';
export class SyncInChecker {
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
    async checkApplicationsAndDataAndRecordRepoTransBlocks(dataMessages) {
        const [syncInActorChecker, syncInDataChecker, missingRecordRepoTransBlockDao, syncInRepositoryChecker, repoTransBlockApplicationsToChangeDao, syncInApplicationChecker, sharingMessageRepoTransBlockDao, syncInRepoTransBlockCreator] = await container(this).get(SYNC_IN_ACTOR_CHECKER, SYNC_IN_DATA_CHECKER, MISSING_RECORD_REPO_TRANS_BLOCK_DAO, SYNC_IN_REPO_CHECKER, REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO, SYNC_IN_SCHEMA_CHECKER, SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, SYNC_IN_REPO_TRANS_BLOCK_CREATOR);
        const { dataMessagesWithCompatibleApplications, dataMessagesWithIncompatibleApplications, dataMessagesWithInvalidApplications, dataMessagesToBeUpgraded, maxVersionedMapByApplicationAndDomainNames, requiredApplicationVersionIds, applicationsWithChangesMap, } = await syncInApplicationChecker.checkApplications(dataMessages);
        const { actorMap, actorMapById, consistentMessages } = await syncInActorChecker.ensureActorsAndGetAsMaps(dataMessages, dataMessagesWithInvalidData);
        const { consistentMessages, sharingNodeRepositoryMap } = await syncInRepositoryChecker.ensureRepositories(allDataMessages, dataMessagesWithInvalidData);
        dataMessagesWithInvalidData = dataMessagesWithInvalidData
            .concat(dataMessagesWithInvalidApplications);
        // this.updateApplicationReferences(dataMessagesWithIncompatibleApplications, allApplicationMap);
        // this.updateApplicationReferences(dataMessagesToBeUpgraded, allApplicationMap);
        // Application references for messages with incompatible applications are converted
        // at when the messages are finally processed
        const usedApplicationVersionIdSet = this.updateApplicationReferences(dataMessagesWithCompatibleApplications, maxVersionedMapByApplicationAndDomainNames);
        // this.updateActorReferences(dataMessagesWithIncompatibleApplications, actorMap)
        // this.updateActorReferences(dataMessagesToBeUpgraded, actorMap)
        this.updateActorReferences(dataMessagesWithCompatibleApplications, actorMap);
        // this.updateRepositoryReferences(
        // 	dataMessagesWithIncompatibleApplications, sharingNodeRepositoryMap)
        // this.updateRepositoryReferences(
        // 	dataMessagesToBeUpgraded, sharingNodeRepositoryMap)
        this.updateRepositoryReferences(dataMessagesWithCompatibleApplications, sharingNodeRepositoryMap);
        const { dataMessagesWithCompatibleApplicationsAndData, dataMessagesWithIncompatibleData, existingRepoTransBlocksWithCompatibleApplicationsAndData, missingRecordDataToTMs } = await syncInDataChecker.checkData(dataMessagesWithCompatibleApplications);
        const allDataToTM = await syncInRepoTransBlockCreator
            .createRepositoryTransBlocks(dataMessagesWithIncompatibleApplications, dataMessagesWithIncompatibleData, dataMessagesToBeUpgraded, dataMessagesWithCompatibleApplicationsAndData, dataMessagesWithInvalidData);
        await syncInRepoTransBlockCreator
            .createMissingRecordRepoTransBlocks(missingRecordDataToTMs, missingRecordRepoTransBlockDao);
        await syncInRepoTransBlockCreator
            .createSharingMessageRepoTransBlocks(allDataToTM, sharingMessageRepoTransBlockDao);
        // Currently, SharingNodeRepoTransBlocks are not needed for incoming messages.
        // Their are used to track the sync status of the outgoing RTBs only
        // await this.recordAllSharingNodeRepoTransBlocks();
        const sharingMessagesWithCompatibleApplicationsAndData = await this.recordRepoTransBlockApplicationToChange(dataMessagesWithIncompatibleApplications, 
        // dataMessagesToBeUpgraded,
        applicationsWithChangesMap, 
        // dataMessagesWithCompatibleApplicationsAndData,
        // sharingMessagesWithIncompatibleData,
        // missingRecordRepoTransBlocks,
        repoTransBlockApplicationsToChangeDao);
        return [
            sharingMessagesWithCompatibleApplicationsAndData,
            existingRepoTransBlocksWithCompatibleApplicationsAndData,
            dataMessagesWithCompatibleApplications,
            usedApplicationVersionIdSet
        ];
    }
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
    updateApplicationReferences(dataMessages, maxVersionedMapByApplicationAndDomainNames) {
        const usedApplicationIndexSet = new Set();
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            // const applicationIndexMapByRemoteApplicationIndex: Map<RemoteApplicationIndex, ApplicationIndex> =
            // new Map();
            const applicationVersionIdMapByRemoteApplicationVersionId = new Map();
            const localApplicationVersions = [];
            const remoteApplicationVersions = data.applicationVersions;
            for (const applicationVersion of remoteApplicationVersions) {
                const application = applicationVersion.application;
                const localApplicationVersionView = maxVersionedMapByApplicationAndDomainNames
                    .get(application.domain.name).get(application.name);
                // const localApplicationIndex = localApplicationVersionView.index;
                // const remoteApplicationIndex = application.index;
                // application.index = localApplicationIndex;
                application.index = localApplicationVersionView.application.index;
                // applicationIndexMapByRemoteApplicationIndex.set(remoteApplicationIndex, localApplicationIndex);
                const localApplicationVersionId = localApplicationVersionView.id;
                const remoteApplicationVersionId = applicationVersion.id;
                applicationVersionIdMapByRemoteApplicationVersionId.set(remoteApplicationVersionId, localApplicationVersionId);
                localApplicationVersions.push(applicationVersion);
            }
            data.applicationVersions = localApplicationVersions;
            for (const repoTransHistory of data.repoTransHistories) {
                delete repoTransHistory.id;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    delete operationHistory.id;
                    const localApplicationVersionId = applicationVersionIdMapByRemoteApplicationVersionId.get(operationHistory.entity.applicationVersion.id);
                    usedApplicationIndexSet.add(localApplicationVersionId);
                    operationHistory.entity.applicationVersion.id = localApplicationVersionId;
                    for (const recordHistory of operationHistory.recordHistory) {
                        delete recordHistory.id;
                    }
                }
            }
        }
        return usedApplicationIndexSet;
    }
    updateActorReferences(dataMessages, actorMap) {
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const actorMapByRemoteActorId = new Map();
            const newActors = [];
            for (const actor of data.actors) {
                const localActor = actorMap.get(actor.uuId).get(actor.user.uniqueId).get(actor.terminal.name)
                    .get(actor.terminal.secondId).get(actor.terminal.owner.uniqueId);
                actorMapByRemoteActorId.set(actor.id, localActor);
                newActors.push(localActor);
            }
            data.actors = newActors;
            for (const repoTransHistory of data.repoTransHistories) {
                repoTransHistory.actor = actorMapByRemoteActorId.get(repoTransHistory.actor.id);
                for (const operationHistory of repoTransHistory.operationHistory) {
                    for (const recordHistory of operationHistory.recordHistory) {
                        recordHistory.actor = actorMapByRemoteActorId.get(recordHistory.actor.id);
                    }
                }
            }
        }
    }
    updateRepositoryReferences(dataMessages, sharingNodeRepositoryMap) {
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const repositoryMap = sharingNodeRepositoryMap.get(dataMessage.sharingMessage.sharingNode.id);
            const repositoryId = repositoryMap.get(dataMessage.agtRepositoryId);
            data.repository.id = repositoryId;
            for (const repoTransHistory of data.repoTransHistories) {
                if (repoTransHistory.repository) {
                    repoTransHistory.repository.id = repositoryId;
                }
            }
        }
    }
    async recordRepoTransBlockApplicationToChange(dataMessagesWithIncompatibleApplications, 
    // dataMessagesToBeUpgraded: IDataToTM[],
    applicationWithChangesMap, 
    // dataMessagesWithCompatibleApplicationsAndData: IDataToTM[],
    // sharingMessagesWithIncompatibleData: ISharingMessage[],
    // missingRecordRepoTransBlocks: IMissingRecordRepoTransBlock[],
    repoTransBlockApplicationsToChangeDao) {
        // const sharingMessagesWithIncompatibleApplications =
        // dataMessagesWithIncompatibleApplications.map(( dataMessagesWithIncompatibleApplications ) =>
        // { /** * Record the messages (with data, because it cannot yet be processed) for
        // messages * that require application changes (new applications or application upgrades). */ return
        // this.syncInUtils.createSharingMessage( dataMessagesWithIncompatibleApplications,
        // SharingMessageProcessingStatus.NEEDS_SCHEMA_CHANGES, true); }); const
        // sharingMessagesToBeUpgraded = dataMessagesToBeUpgraded.map((
        // dataMessageToBeUpgraded ) => { /** * Record the messages (with data, because it
        // cannot yet be processed) for messages * that need to be upgraded to application
        // versions present on this TM. * * Messages cannot yet be processed since messages
        // upgrades are done by the client * domain code and need to be sent over to those
        // allDomains for upgrading. */ return this.syncInUtils.createSharingMessage(
        // dataMessageToBeUpgraded, SharingMessageProcessingStatus.NEEDS_DATA_UPGRADES,
        // true); }); const sharingMessagesWithCompatibleApplicationsAndData =
        // dataMessagesWithCompatibleApplicationsAndData.map(( sharingMessageWithCompatibleApplications
        // ) => { return this.syncInUtils.createSharingMessage(
        // sharingMessageWithCompatibleApplications,
        // SharingMessageProcessingStatus.READY_FOR_PROCESSING, false); }); const
        // allSharingMessagesToCreate: ISharingMessage[] = [
        // ...sharingMessagesWithIncompatibleApplications, ...sharingMessagesToBeUpgraded,
        // ...sharingMessagesWithIncompatibleData,
        // ...sharingMessagesWithCompatibleApplicationsAndData ]; await
        // this.sharingMessageDao.bulkCreate( allSharingMessagesToCreate, false);
        // const m: MissingRecordRepoTransBlock;
        // if (missingRecordRepoTransBlocks.length) {
        // 	await this.missingRecordRepoTransBlockDao.bulkCreate(
        // 		missingRecordRepoTransBlocks, false);
        // }
        // Record all applications to change per sharing message with incompatible applications
        const repoTransBlockApplicationsToChange = [];
        for (let i = 0; i < dataMessagesWithIncompatibleApplications.length; i++) {
            const message = dataMessagesWithIncompatibleApplications[i];
            // const sharingMessage: ISharingMessage =
            // sharingMessagesWithIncompatibleApplications[i];
            let allMessageApplicationsAreCompatible = true;
            let messageBuildWithOutdatedApplicationVersions = false;
            // for every application (at a given version) used in the message
            for (const application of message.data.applications) {
                let matchingApplication = this.findMatchingApplication(applicationWithChangesMap, application);
                if (!matchingApplication) {
                    continue;
                }
                // If a there was a application that needs to be added or upgraded
                repoTransBlockApplicationsToChange.push({
                    // sharingMessage,
                    repositoryTransactionBlock: message.repositoryTransactionBlock,
                    status: ApplicationChangeStatus.CHANGE_NEEDED,
                    application: matchingApplication
                });
            }
        }
        await repoTransBlockApplicationsToChangeDao.bulkCreate(repoTransBlockApplicationsToChange, false);
        return sharingMessagesWithCompatibleApplicationsAndData;
    }
    findMatchingApplication(applicationMap, application) {
        const applicationsForDomainName = applicationMap.get(application.domain.name);
        if (!applicationsForDomainName) {
            return null;
        }
        return applicationsForDomainName.get(application.name);
    }
}
DI.set(SYNC_IN_CHECKER, SyncInChecker);
//# sourceMappingURL=SyncInChecker.js.map