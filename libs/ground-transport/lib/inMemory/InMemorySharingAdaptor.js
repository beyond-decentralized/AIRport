import { PlatformType } from '@airport/ground-control';
import { InMemoryChangeList } from "./InMemoryChangeList";
import { InMemoryChangeStore } from "./InMemoryChangeStore";
/**
 * Created by Papa on 11/26/2016.
 */
export class InMemorySharingAdaptor {
    constructor() {
        this.changeStore = new InMemoryChangeStore();
    }
    setupInfoBelongsTo(setupInfo, setupInfos) {
        if (setupInfo.platformType !== PlatformType.IN_MEMORY) {
            return false;
        }
        return setupInfos.some((otherSetupInfo) => {
            if (otherSetupInfo.platformType === PlatformType.IN_MEMORY) {
                return true;
            }
        });
    }
    async initialize(setupInfo) {
        return {
            platformType: PlatformType.IN_MEMORY,
            recordIdField: 'id',
            dbIdField: 'dbId'
        };
    }
    async findExistingChangeLists(setupInfo) {
        return this.changeStore.getChangeListInfos();
    }
    async createChangeList(shareInfo, setupInfo) {
        this.changeStore.addChangeList(shareInfo.name);
        let changeList = new InMemoryChangeList(shareInfo, setupInfo, this.changeStore);
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
        return new InMemoryChangeList(shareInfo, setupInfo, this.changeStore);
    }
}
//# sourceMappingURL=InMemorySharingAdaptor.js.map