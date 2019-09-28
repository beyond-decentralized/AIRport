import {
	IUser,
} from '../user';
import {
	ISecurityQuestion,
} from './securityquestion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISecurityAnswer {
	
	// Id Properties

	// Id Relations
	user: IUser;
	securityQuestion: ISecurityQuestion;

	// Non-Id Properties
	answer?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


