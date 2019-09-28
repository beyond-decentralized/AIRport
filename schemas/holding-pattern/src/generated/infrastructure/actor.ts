import {
	IUser,
	ITerminal,
} from '@airport/travel-document-checkpoint';
import {
	IActorApplication,
} from './actorapplication';
import {
	IRepositoryActor,
} from '../repository/repositoryactor';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IActor {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	randomId?: number;

	// Non-Id Relations
	user?: IUser;
	terminal?: ITerminal;
	actorApplications?: IActorApplication[];
	repositoryActor?: IRepositoryActor[];

	// Transient Properties

	// Public Methods
	
}


