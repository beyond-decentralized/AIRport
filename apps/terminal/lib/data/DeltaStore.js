"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const ground_control_1 = require("@airport/ground-control");
const ground_transport_1 = require("@airport/ground-transport");
const UpdateState_1 = require("../core/UpdateState");
class DeltaStore {
    constructor(config, sharingAdaptor = null) {
        this.config = config;
        this.sharingAdaptor = sharingAdaptor;
        this.updateState = UpdateState_1.UpdateState.LOCAL;
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
exports.DeltaStore = DeltaStore;
var IN_MEMORY_SHARING_ADAPTOR;
var GOOGLE_SHARING_ADAPTOR;
function getSharingAdaptor(platformType) {
    switch (platformType) {
        case ground_control_1.PlatformType.GOOGLE_DOCS:
            if (!GOOGLE_SHARING_ADAPTOR) {
                GOOGLE_SHARING_ADAPTOR = getGooglesSharingAdaptor();
            }
            return GOOGLE_SHARING_ADAPTOR;
        case ground_control_1.PlatformType.IN_MEMORY:
            if (!IN_MEMORY_SHARING_ADAPTOR) {
                IN_MEMORY_SHARING_ADAPTOR = new ground_transport_1.InMemorySharingAdaptor();
            }
            return IN_MEMORY_SHARING_ADAPTOR;
        case ground_control_1.PlatformType.STUB:
            return new ground_transport_1.StubSharingAdaptor();
        default:
            throw `Unsupported PlatformType: ${platformType}`;
    }
}
exports.getSharingAdaptor = getSharingAdaptor;
function getGooglesSharingAdaptor() {
    let googleApi = getGoogleApi();
    let googleDrive = getGoogleDrive(googleApi);
    let googleDriveAdaptor = getGoogleDriveAdaptor(googleApi, googleDrive);
    let googleRealtime = getGoogleRealtime(googleDrive);
    let googleRealtimeAdaptor = getGoogleRealtimeAdaptor(googleRealtime);
    let googleSharingAdaptor = getGoogleSharingAdaptor(googleDrive, googleDriveAdaptor, googleRealtime, googleRealtimeAdaptor);
    return googleSharingAdaptor;
}
exports.getGooglesSharingAdaptor = getGooglesSharingAdaptor;
function getGoogleApi() {
    return new ground_transport_1.GoogleApi();
}
function getGoogleDrive(googleApi) {
    return new ground_transport_1.GoogleDrive(googleApi);
}
function getGoogleDriveAdaptor(googleApi, googleDrive) {
    return new ground_transport_1.GoogleDriveAdaptor(googleApi, googleDrive);
}
function getGoogleRealtime(googleDrive) {
    return new ground_transport_1.GoogleRealtime(googleDrive);
}
function getGoogleRealtimeAdaptor(googleRealtime) {
    return new ground_transport_1.GoogleRealtimeAdaptor(googleRealtime);
}
function getGoogleSharingAdaptor(googleDrive, googleDriveAdaptor, googleRealtime, googleRealtimeAdaptor) {
    return new ground_transport_1.GoogleSharingAdaptor(googleDrive, googleDriveAdaptor, googleRealtime, googleRealtimeAdaptor);
}
//# sourceMappingURL=DeltaStore.js.map