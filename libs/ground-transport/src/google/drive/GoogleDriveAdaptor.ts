import {
	GoogleChangeListShareInfo,
	GoogleSetupInfo
}                    from '@airport/terminal-map';
import {
	ApiConstants,
	GoogleApi
}                    from '../GoogleApi';
import {GoogleDrive} from './GoogleDrive';
import {
	DriveConstants,
	DriveResponse,
	MimeTypes
}                    from './GoogleDriveModel';

/**
 * Created by Papa on 1/3/2016.
 */
export class GoogleDriveAdaptor {

	constructor(
		private googleApi: GoogleApi,
		private googleDrive: GoogleDrive
	) {
	}

	initialize(
		apiKey: string,
		clientId: string
	): Promise<any> {
		return this.googleApi.authorizeApis(apiKey, clientId, ApiConstants.ALL_SCOPES).then(() => {
			let loadRequests = [
				this.googleApi.loadApi('drive', DriveConstants.VERSION),
				this.googleApi.loadApi('drive-realtime,drive-share', DriveConstants.VERSION)
			];

			return Promise.all(loadRequests);
		});
	}

	setup(
		setupInfo: GoogleSetupInfo
	): Promise<DriveResponse> {
		return this.googleDrive.findOrCreateUniqueFolder(setupInfo.rootFolder);
	}

	listChangeLists(
		info: GoogleSetupInfo
	): Promise<GoogleChangeListShareInfo[]> {
		return this.googleDrive.listFiles(info.sharedAppFolderId).then((
			response: DriveResponse
		) => {
			let files = response.result.files;
			if (!files || files.length === 0) {
				return [];
			}
			let shares: GoogleChangeListShareInfo[] = [];
			files.forEach((file) => {
				shares.push({
					name: file.name,
					dbId: info.dbIdField,
					folderId: file.id
				});
			});
			return shares;
		});
	}

	populateChangeListFileInfo(
		changeListInfo: GoogleChangeListShareInfo
	): Promise<GoogleChangeListShareInfo> {
		return this.googleDrive.listFiles(changeListInfo.folderId).then((
			response: DriveResponse
		) => {
			let files = response.result.files;
			if (!files || files.length === 0) {
				return changeListInfo;
			}
			files.forEach((file) => {
				if (file.mimeType.indexOf(MimeTypes.REALTIME) === 0) {
					if (changeListInfo.realtimeFileId) {
						throw `Multiple Realtime files found for Change List: ${changeListInfo.name}`;
					}
					changeListInfo.realtimeFileId = file.id;
				}
			});
			return changeListInfo;
		});
	}
}