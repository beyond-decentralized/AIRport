import {
	IChild,
} from './child';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IParent {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	bool?: boolean;
	num?: number;
	str?: string;

	// Non-Id Relations
	children?: IChild[];

	// Transient Properties

	// Public Methods
	
}


