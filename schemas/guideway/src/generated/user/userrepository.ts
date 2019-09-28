import {
	IRepository,
} from '../repository/repository';
import {
	IUser,
} from './user';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserRepository {
	
	// Id Properties

	// Id Relations
	repository: IRepository;
	user: IUser;

	// Non-Id Properties
	permission?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


