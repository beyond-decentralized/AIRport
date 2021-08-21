/*
import {
    GoogleApi,
    GoogleDrive,
    GoogleDriveAdaptor,
    GoogleRealtime,
    GoogleRealtimeAdaptor,
    GoogleSharingAdaptor,
    PlatformType,
    SharingAdaptor, SharedChangeList, ChangeListShareInfo, ChangeRecord, ChangeRecordIterator
} from "@airport/ground-control";
*/
import { PlatformType } from '@airport/ground-control';
import { GoogleApi, GoogleDrive, GoogleDriveAdaptor, GoogleRealtime, GoogleRealtimeAdaptor, GoogleSharingAdaptor, InMemorySharingAdaptor, StubSharingAdaptor } from '@airport/ground-transport';
import { UpdateState } from '../core/UpdateState';
export class DeltaStore {
    constructor(config, sharingAdaptor = null) {
        this.config = config;
        this.sharingAdaptor = sharingAdaptor;
        this.updateState = UpdateState.LOCAL;
    }
    async addChanges(changeListConfig, changeRecords) {
        await this.changeList.addChanges(changeRecords);
        this.lastKnownChangeRecord = changeRecords[changeRecords.length - 1];
    }
    goOffline() {
        if (this.remoteChangesSubscription) {
            this.remoteChangesSubscription.unsubscribe();
        }
    }
    async loadTransactionsSinceLastKnown(lastKnownChangeRecord) {
        this.lastKnownChangeRecord = lastKnownChangeRecord;
        return await this.changeList.loadFromRecord(this.lastKnownChangeRecord);
    }
    async goOnline(remoteChangesCallback) {
        await this.sharingAdaptor.initialize(this.config.setupInfo);
        await this.setupChangeList();
        this.remoteChangesSubscription = this.changeList.changesAddedRemotelySubject().subscribe((iterator) => {
            let transactions = [];
            while (iterator.hasNext()) {
                transactions.push(iterator.next());
            }
            remoteChangesCallback(transactions).then(() => {
                this.lastKnownChangeRecord = transactions[transactions.length - 1];
            });
        });
    }
    async setupChangeList() {
        await this.loadChangeList();
        let changeListConfig = this.config.changeListConfig;
        let remoteLoadOp;
        if (this.config.changeListConfig.exists) {
            remoteLoadOp = this.sharingAdaptor.loadChangeList(changeListConfig.changeListInfo, this.config.setupInfo);
        }
        else {
            remoteLoadOp = this.sharingAdaptor.createChangeList(changeListConfig.changeListInfo, this.config.setupInfo);
            this.config.changeListConfig.exists = true;
        }
        let loadResponse = await remoteLoadOp;
        this.changeList = loadResponse;
    }
    async loadChangeList() {
        let changeLists = await this.sharingAdaptor.findExistingChangeLists(this.config.setupInfo);
        let changeListConfig = this.config.changeListConfig;
        changeLists.some((changeListShareInfo) => {
            if (changeListShareInfo.name === changeListConfig.changeListInfo.name) {
                changeListConfig.exists = true;
                return true;
            }
        });
    }
}
var IN_MEMORY_SHARING_ADAPTOR;
var GOOGLE_SHARING_ADAPTOR;
export function getSharingAdaptor(platformType) {
    switch (platformType) {
        case PlatformType.GOOGLE_DOCS:
            if (!GOOGLE_SHARING_ADAPTOR) {
                GOOGLE_SHARING_ADAPTOR = getGooglesSharingAdaptor();
            }
            return GOOGLE_SHARING_ADAPTOR;
        case PlatformType.IN_MEMORY:
            if (!IN_MEMORY_SHARING_ADAPTOR) {
                IN_MEMORY_SHARING_ADAPTOR = new InMemorySharingAdaptor();
            }
            return IN_MEMORY_SHARING_ADAPTOR;
        case PlatformType.STUB:
            return new StubSharingAdaptor();
        default:
            throw new Error(`Unsupported PlatformType: ${platformType}`);
    }
}
export function getGooglesSharingAdaptor() {
    let googleApi = getGoogleApi();
    let googleDrive = getGoogleDrive(googleApi);
    let googleDriveAdaptor = getGoogleDriveAdaptor(googleApi, googleDrive);
    let googleRealtime = getGoogleRealtime(googleDrive);
    let googleRealtimeAdaptor = getGoogleRealtimeAdaptor(googleRealtime);
    let googleSharingAdaptor = getGoogleSharingAdaptor(googleDrive, googleDriveAdaptor, googleRealtime, googleRealtimeAdaptor);
    return googleSharingAdaptor;
}
function getGoogleApi() {
    return new GoogleApi();
}
function getGoogleDrive(googleApi) {
    return new GoogleDrive(googleApi);
}
function getGoogleDriveAdaptor(googleApi, googleDrive) {
    return new GoogleDriveAdaptor(googleApi, googleDrive);
}
function getGoogleRealtime(googleDrive) {
    return new GoogleRealtime(googleDrive);
}
function getGoogleRealtimeAdaptor(googleRealtime) {
    return new GoogleRealtimeAdaptor(googleRealtime);
}
function getGoogleSharingAdaptor(googleDrive, googleDriveAdaptor, googleRealtime, googleRealtimeAdaptor) {
    return new GoogleSharingAdaptor(googleDrive, googleDriveAdaptor, googleRealtime, googleRealtimeAdaptor);
}
//# sourceMappingURL=DeltaStore.js.map