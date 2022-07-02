import {
	IClient,
} from './client';
import {
	IType,
} from '../type/type';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IClientType {
	
	// Id Properties

	// Id Relations
	client: IClient;
	type: IType;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


