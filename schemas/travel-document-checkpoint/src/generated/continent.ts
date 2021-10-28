import {
	ICountry,
} from './country';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IContinent {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	countries?: ICountry[];

	// Transient Properties

	// Public Methods
	
}


