import {
	IParent,
} from './parent';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IChild {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	bool?: boolean;
	num?: number;
	str?: string;

	// Non-Id Relations
	parent?: IParent;

	// Transient Properties

	// Public Methods
	
}


