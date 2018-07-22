/**
 * Created by Papa on 1/7/2016.
 */

import {
	ChangeListShareInfo,
	GoogleChangeListShareInfo,
	GoogleSetupInfo,
	PlatformType,
	SharedChangeList,
	SharingAdaptor
}                               from '@airport/terminal-map';
import {GoogleDrive}            from './drive/GoogleDrive';
import {GoogleDriveAdaptor}     from './drive/GoogleDriveAdaptor';
import {DriveResponse}          from './drive/GoogleDriveModel';
import {GoogleSharedChangeList} from './GoogleSharedChangeList';
import {DocumentHandle}         from './realtime/DocumentHandle';
import {GoogleRealtime}         from './realtime/GoogleRealtime';
import {GoogleRealtimeAdaptor}  from './realtime/GoogleRealtimeAdaptor';

// @Injectable()
export class GoogleSharingAdaptor implements SharingAdaptor {

	constructor(
		private drive: GoogleDrive,
		private driveAdaptor: GoogleDriveAdaptor,
		private realtime: GoogleRealtime,
		private realtimeAdaptor: GoogleRealtimeAdaptor
	) {
	}

	setupInfoBelongsTo(
		setupInfo: GoogleSetupInfo,
		setupInfos: GoogleSetupInfo[]
	): boolean {
		if (setupInfo.platformType !== PlatformType.GOOGLE_DOCS) {
			return false;
		}
		return setupInfos.some((
			otherSetupInfo: GoogleSetupInfo
		) => {
			if (otherSetupInfo.platformType === PlatformType.GOOGLE_DOCS) {
				return setupInfo.apiKey === otherSetupInfo.apiKey
					&& setupInfo.clientId === otherSetupInfo.clientId;
			}
		})
	}

	initialize(
		setupInfo: GoogleSetupInfo
	): Promise<GoogleSetupInfo> {
		return this.driveAdaptor.initialize(setupInfo.apiKey, setupInfo.clientId).then(() => {
			return this.driveAdaptor.setup(setupInfo);
		}).then((driveFile: DriveResponse) => {
			setupInfo.sharedAppFolderId = driveFile.result.id;
			return setupInfo;
		});
	}

	createChangeList(
		shareInfo: ChangeListShareInfo,
		setupInfo: GoogleSetupInfo
	): Promise<SharedChangeList> {
		let folderId;
		let realtimeFileId;
		return this.drive.findOrCreateUniqueFolder(name, setupInfo.sharedAppFolderId).then((
			driveResponse
		) => {
			folderId = driveResponse.result.id;
			return this.realtime.findOrCreateFileUniqueFile(name + ' - Realtime', folderId);
		}).then((
			driveResponse
		) => {
			realtimeFileId = driveResponse.result.id;
			return this.realtimeAdaptor.startNewShare(realtimeFileId);
		}).then((
			handle: DocumentHandle
		) => {
			let googleShareInfo: GoogleChangeListShareInfo = {
				name: shareInfo.name,
				dbId: shareInfo.dbId,
				folderId: folderId,
				realtimeFileId: realtimeFileId
			};
			return new GoogleSharedChangeList(setupInfo, googleShareInfo, handle);
		});
	}

	findExistingChangeLists(
		setupInfo: GoogleSetupInfo
	): Promise<GoogleChangeListShareInfo[]> {
		return this.driveAdaptor.listChangeLists(setupInfo).then((listings) => {
			return listings;
		});
	}

	loadChangeList(
		shareInfo: GoogleChangeListShareInfo,
		setupInfo: GoogleSetupInfo
	): Promise<SharedChangeList> {
		return this.driveAdaptor.populateChangeListFileInfo(shareInfo).then((
			shareInfo: GoogleChangeListShareInfo
		) => {
			return this.realtimeAdaptor.openShare(shareInfo.realtimeFileId).then((
				handle: DocumentHandle
			) => {
				return new GoogleSharedChangeList(setupInfo, shareInfo, handle);
			});
		});
	}

}