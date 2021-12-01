import { IVespaDocument } from '../../lingo/model/VespaDocument';

export interface IVespaApplicationStore {

	documentMap: {
		[documentName: string]: IVespaDocument
	}

}

export class VespaApplicationStore {

	documentMap: {
		[documentName: string]: IVespaDocument
	} = {};

}
