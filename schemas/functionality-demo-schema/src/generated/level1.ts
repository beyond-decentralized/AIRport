import {
	ILevel2,
} from './level2';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILevel1 {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	bool?: boolean;
	num?: number;
	str?: string;

	// Non-Id Relations
	contained?: ILevel2[];

	// Transient Properties

	// Public Methods
	
}


