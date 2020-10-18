import {
	DbSchema,
} from '@airport/ground-control';
import {
	IApplication,
} from './application';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDomain {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	name?: string;

	// Non-Id Relations
	applications?: IApplication[];

	// Transient Properties
	schemas?: IDbSchema[];

	// Public Methods
	
}


