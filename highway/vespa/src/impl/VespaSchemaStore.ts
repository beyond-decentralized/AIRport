import { IVespaDocument } from '../lingo/model/VespaDocument';

export interface IVespaSchemaStore {

	documentMap: {
		[documentName: string]: IVespaDocument
	}

}

export class VespaSchemaStore {

	documentMap: {
		[documentName: string]: IVespaDocument
	} = {};

}
