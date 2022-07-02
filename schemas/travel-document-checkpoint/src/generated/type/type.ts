import {
	ITypeClassification,
} from './typeclassification';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IType {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	typeClassifications?: ITypeClassification[];

	// Transient Properties

	// Public Methods
	
}


