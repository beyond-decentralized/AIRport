/**
 * Created by Papa on 5/26/2016.
 */

declare namespace gapi.client.drive.files {

	export interface FileRef {
		fileId:string;
		fields?:string;
	}

	export interface DirRef {
		spaces?:string;
		fields?:string;
		pageSize?:number;
		pageToken?:string;
		q?:string;
	}

	export interface FileMetadata {
		name:string;
		mimeType:string;
		parents?:string[];
	}

	export interface CreateDescriptor {
		resource:FileMetadata;
		fields:string;
	}

	export function create(
		createDescriptor:CreateDescriptor
	):Promise<any>;

	export function list(
		dirRef?:DirRef
	):Promise<any>;

	export function get(
		fileRef:FileRef
	);

}