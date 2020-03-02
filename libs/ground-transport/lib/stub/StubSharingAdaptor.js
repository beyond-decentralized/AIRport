"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_map_1 = require("@airport/terminal-map");
const StubChangeList_1 = require("./StubChangeList");
/**
 * Created by Papa on 12/14/2016.
 */
class StubSharingAdaptor {
    setupInfoBelongsTo(setupInfo, setupInfos) {
        if (setupInfo.platformType !== terminal_map_1.PlatformType.STUB) {
            return false;
        }
        return setupInfos.some((otherSetupInfo) => {
            if (otherSetupInfo.platformType === terminal_map_1.PlatformType.STUB) {
                return true;
            }
        });
    }
    async initialize(setupInfo) {
        this.changeLists = [];
        return {
            platformType: terminal_map_1.PlatformType.STUB,
            recordIdField: 'id',
            dbIdField: 'dbId'
        };
    }
    async findExistingChangeLists(setupInfo) {
        return this.changeLists.map((changeList) => {
            return changeList.shareInfo;
        });
    }
    async createChangeList(shareInfo, setupInfo) {
        let changeList = new StubChangeList_1.StubChangeList(shareInfo, setupInfo);
        this.changeLists.push(changeList);
        return changeList;
    }
    async loadChangeList(shareInfo, setupInfo) {
        let matchingChangeList;
        this.changeLists.some((changeList) => {
            if (shareInfo.name == changeList.shareInfo.name) {
                matchingChangeList = changeList;
                return true;
            }
        });
        if (!matchingChangeList) {
            matchingChangeList = await this.createChangeList(shareInfo, setupInfo);
        }
        return matchingChangeList;
    }
}
exports.StubSharingAdaptor = StubSharingAdaptor;
//# sourceMappingURL=StubSharingAdaptor.js.map