import {
	ILevel1,
} from './level1';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILevel2 {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	bool?: boolean;
	num?: number;
	str?: string;

	// Non-Id Relations
	up?: ILevel1;

	// Transient Properties

	// Public Methods
	
}


