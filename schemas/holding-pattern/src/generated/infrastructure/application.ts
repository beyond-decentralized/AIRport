import {
	IActorApplication,
} from './actorapplication';
import {
	IRepositoryApplication,
} from '../repository/repositoryapplication';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplication {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	host?: string;
	port?: number;

	// Non-Id Relations
	actorApplications?: IActorApplication[];
	repositoryApplications?: IRepositoryApplication[];

	// Transient Properties

	// Public Methods
	
}


