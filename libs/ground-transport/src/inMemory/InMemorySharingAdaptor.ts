import {
	ChangeListShareInfo,
	PlatformType,
	SharedChangeList,
	SharingAdaptor,
	SharingPlatformSetupInfo
}                            from "@airport/terminal-map";
import {InMemoryChangeList}  from "./InMemoryChangeList";
import {InMemoryChangeStore} from "./InMemoryChangeStore";

/**
 * Created by Papa on 11/26/2016.
 */

export class InMemorySharingAdaptor implements SharingAdaptor {

	changeStore: InMemoryChangeStore = new InMemoryChangeStore();

	setupInfoBelongsTo(
		setupInfo: SharingPlatformSetupInfo,
		setupInfos: SharingPlatformSetupInfo[]
	): boolean {
		if (setupInfo.platformType !== PlatformType.IN_MEMORY) {
			return false;
		}
		return setupInfos.some((
			otherSetupInfo: SharingPlatformSetupInfo
		) => {
			if (otherSetupInfo.platformType === PlatformType.IN_MEMORY) {
				return true;
			}
		})
	}

	async initialize(
		setupInfo: SharingPlatformSetupInfo
	): Promise<SharingPlatformSetupInfo> {
		return {
			platformType: PlatformType.IN_MEMORY,
			recordIdField: 'id',
			dbIdField: 'dbId'
		}
	}

	async findExistingChangeLists(
		setupInfo: SharingPlatformSetupInfo
	): Promise<ChangeListShareInfo[]> {
		return this.changeStore.getChangeListInfos();
	}

	async createChangeList(
		shareInfo: ChangeListShareInfo,
		setupInfo: SharingPlatformSetupInfo
	): Promise<SharedChangeList> {
		this.changeStore.addChangeList(shareInfo.name);
		let changeList = new InMemoryChangeList(shareInfo, setupInfo, this.changeStore);

		return changeList;
	}

	async loadChangeList(
		shareInfo: ChangeListShareInfo,
		setupInfo: SharingPlatformSetupInfo
	): Promise<SharedChangeList> {
		let matchingChangeListInfo;
		let foundChangeList = this.changeStore.getChangeListInfos().some(
			changeListInfo => {
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