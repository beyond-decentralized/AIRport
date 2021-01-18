export interface IVespaFieldset {

	fields: {
		[fieldName: string]: boolean
	}
	isDefault: boolean;
	name: string;

}
