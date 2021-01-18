import { IVespaField }    from './VespaField';
import { IVespaFieldset } from './VespaFieldset';

export interface IVespaDocument {

	fields: {
		[fieldname: string]: IVespaField
	}

	fieldsetMap: {
		[fieldsetName: string]: IVespaFieldset
	}

	name: string

}

export interface IVespaDocumentWithConstructor<VespaEntity = any>
	extends IVespaDocument {

	classConstructor: { new(...args: any[]): VespaEntity }

}
