import { PlatformType, } from "@airport/terminal-map";
import { StubChangeList } from "./StubChangeList";
/**
 * Created by Papa on 12/14/2016.
 */
export class StubSharingAdaptor {
    setupInfoBelongsTo(setupInfo, setupInfos) {
        if (setupInfo.platformType !== PlatformType.STUB) {
            return false;
        }
        return setupInfos.some((otherSetupInfo) => {
            if (otherSetupInfo.platformType === PlatformType.STUB) {
                return true;
            }
        });
    }
    async initialize(setupInfo) {
        this.changeLists = [];
        return {
            platformType: PlatformType.STUB,
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
        let changeList = new StubChangeList(shareInfo, setupInfo);
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
//# sourceMappingURL=StubSharingAdaptor.js.map