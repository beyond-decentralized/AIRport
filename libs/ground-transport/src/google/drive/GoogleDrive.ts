import {GoogleApi} from '../GoogleApi'
import {
	DriveConstants,
	DriveResponse,
	MimeTypes
}                  from './GoogleDriveModel'

/**
 * Created by Papa on 1/2/2016.
 */
export class GoogleDrive {

	constructor(
		private googleApi: GoogleApi
	) {
		let SCOPES = [
			'https://www.googleapis.com/auth/drive.appfolder',
			'email',
			'profile',
			// Add other scopes needed by your application.
		]
	}

	createFolder(
		name: string,
		folderId?: string
	): Promise<any> {
		let parents
		if (folderId) {
			parents = [folderId]
		}
		let fileMetadata: gapi.client.drive.files.FileMetadata         = {
			name: name,
			mimeType: MimeTypes.FOLDER,
			parents: parents
		}
		let createDescriptor: gapi.client.drive.files.CreateDescriptor = {
			resource: fileMetadata,
			fields: 'id'
		}
		return gapi.client.drive.files.create(createDescriptor)
	}

	createFile(
		name: string,
		mimeType: string,
		folderId: string
	): Promise<DriveResponse> {
		let fileMetadata: gapi.client.drive.files.FileMetadata = {
			mimeType: mimeType,
			name: name,
			parents: [folderId]
		}
		return <Promise<DriveResponse>><any>Promise.resolve().then(() => {
			return gapi.client.drive.files.create({
				resource: fileMetadata,
				fields: 'id'
			})
		})
	}

	findOrCreateBook(
		name: string,
		folderId: string
	): Promise<DriveResponse> {
		return this.findOrCreateUniqueFile(name, MimeTypes.SPREAD_SHEET_BOOK, folderId)
	}

	findOrCreateUniqueFolder(
		fileName: string,
		folderId?: string
	): Promise<DriveResponse> {
		return this.findFile(fileName, folderId).then((
			response: DriveResponse
		) => {
			let files = response.result.files
			switch (files.length) {
				case 0:
					return this.createFolder(fileName, folderId)
				case 1:
					return {
						result: {
							id: files[0].id
						}
					}
				default:
					throw new Error(
						`Found more than one '${fileName}' in directory '${folderId}', 
						please delete the duplicate.`)
			}
		})
	}

	findOrCreateUniqueFile(
		fileName: string,
		mimeType: string,
		folderId?: string
	): Promise<DriveResponse> {
		return this.findFile(fileName, folderId).then((
			response: DriveResponse
		) => {
			let files = response.result.files
			switch (files.length) {
				case 0:
					return this.createFile(fileName, mimeType, folderId)
				case 1:
					return {
						body: undefined,
						headers: undefined,
						result: {
							id: files[0].id
						},
						status: undefined,
						statusText: undefined
					}
				default:
					throw new Error(
						`Found more than one '${fileName}' in directory '${folderId}',
						please delete the duplicate.`)
			}
		})
	}

	private apiFileList(
		dirRef?: gapi.client.drive.files.DirRef
	): Promise<any> {
		return new Promise((
			resolve,
			reject
		) => {
			resolve()
		}).then(() => {
			return gapi.client.drive.files.list(dirRef)
		})
	}

	findFile(
		fileName: string,
		folderId: string = DriveConstants.DRIVE_FOLDER
	): Promise<any> {
		let query = `name = '${fileName}' and '${folderId}' in parents and trashed=false`
		return this.apiFileList({
			q: query
		}).then((response: DriveResponse) => {
			console.log('Found for q:\n\t' + query)
			console.log(response)
			return response
		}).catch((error: DriveResponse) => {
			console.log('Did not find for q:\n\t' + query)
			if (error.status === 404) {
				return {
					result: {
						files: []
					}
				}
			}
			throw error
		})
	}

	listFiles(
		folderId: string,
		pageToken: string = null,
		space: string     = DriveConstants.DRIVE_SPACE
	): Promise<any> {
		return this.apiFileList({
			fields: 'nextPageToken, files(id, mimeType, name)',
			pageToken: pageToken,
			q: `'${folderId}' in parents and trashed = false`,
			spaces: space
		})
	}

	searchFiles(
		space: string = DriveConstants.DRIVE_SPACE
	): Promise<any> {
		return this.apiFileList({
			spaces: space,
			fields: DriveConstants.APP_DATA_LIST_FIELDS,
			pageSize: 100
		})
	}
}
