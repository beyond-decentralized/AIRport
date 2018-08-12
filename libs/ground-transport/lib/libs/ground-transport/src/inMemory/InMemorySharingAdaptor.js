"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_map_1 = require("@airport/terminal-map");
const InMemoryChangeList_1 = require("./InMemoryChangeList");
const InMemoryChangeStore_1 = require("./InMemoryChangeStore");
/**
 * Created by Papa on 11/26/2016.
 */
class InMemorySharingAdaptor {
    constructor() {
        this.changeStore = new InMemoryChangeStore_1.InMemoryChangeStore();
    }
    setupInfoBelongsTo(setupInfo, setupInfos) {
        if (setupInfo.platformType !== terminal_map_1.PlatformType.IN_MEMORY) {
            return false;
        }
        return setupInfos.some((otherSetupInfo) => {
            if (otherSetupInfo.platformType === terminal_map_1.PlatformType.IN_MEMORY) {
                return true;
            }
        });
    }
    async initialize(setupInfo) {
        return {
            platformType: terminal_map_1.PlatformType.IN_MEMORY,
            recordIdField: 'id',
            dbIdField: 'dbId'
        };
    }
    async findExistingChangeLists(setupInfo) {
        return this.changeStore.getChangeListInfos();
    }
    async createChangeList(shareInfo, setupInfo) {
        this.changeStore.addChangeList(shareInfo.name);
        let changeList = new InMemoryChangeList_1.InMemoryChangeList(shareInfo, setupInfo, this.changeStore);
        return changeList;
    }
    async loadChangeList(shareInfo, setupInfo) {
        let matchingChangeListInfo;
        let foundChangeList = this.changeStore.getChangeListInfos().some(changeListInfo => {
            if (shareInfo.name == changeListInfo.name) {
                return true;
            }
        });
        if (!foundChangeList) {
            this.changeStore.addChangeList(shareInfo.name);
        }
        return new InMemoryChangeList_1.InMemoryChangeList(shareInfo, setupInfo, this.changeStore);
    }
}
exports.InMemorySharingAdaptor = InMemorySharingAdaptor;
//# sourceMappingURL=InMemorySharingAdaptor.js.map