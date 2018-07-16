import {
	ChangeListShareInfo,
	PlatformType,
	SharedChangeList,
	SharingAdaptor,
	SharingPlatformSetupInfo,
} from "@airport/terminal-map";
import { StubChangeList } from "./StubChangeList";

/**
 * Created by Papa on 12/14/2016.
 */
export class StubSharingAdaptor implements SharingAdaptor {

	changeLists: SharedChangeList[];

	setupInfoBelongsTo(
		setupInfo: SharingPlatformSetupInfo,
		setupInfos: SharingPlatformSetupInfo[]
	): boolean {
		if (setupInfo.platformType !== PlatformType.STUB) {
			return false;
		}
		return setupInfos.some((
			otherSetupInfo: SharingPlatformSetupInfo
		) => {
			if (otherSetupInfo.platformType === PlatformType.STUB) {
				return true;
			}
		})
	}

	async initialize(
		setupInfo: SharingPlatformSetupInfo
	): Promise<SharingPlatformSetupInfo> {
		this.changeLists = [];
		return {
			platformType: PlatformType.STUB,
			recordIdField: 'id',
			dbIdField: 'dbId'
		}
	}

	async findExistingChangeLists(
		setupInfo: SharingPlatformSetupInfo
	): Promise<ChangeListShareInfo[]> {
		return this.changeLists.map((changeList) => {
			return changeList.shareInfo;
		});
	}

	async createChangeList(
		shareInfo: ChangeListShareInfo,
		setupInfo: SharingPlatformSetupInfo
	): Promise<SharedChangeList> {
		let changeList = new StubChangeList(shareInfo, setupInfo);
		this.changeLists.push(changeList);

		return changeList;
	}

	async loadChangeList(
		shareInfo: ChangeListShareInfo,
		setupInfo: SharingPlatformSetupInfo
	): Promise<SharedChangeList> {
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