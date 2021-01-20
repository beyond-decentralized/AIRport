export interface IVespaFieldset {

	fieldMap: {
		[fieldName: string]: boolean
	}
	isDefault: boolean;
	name: string;

}
