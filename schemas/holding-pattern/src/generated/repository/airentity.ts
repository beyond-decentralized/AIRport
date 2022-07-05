import {
	User,
} from '@airport/travel-document-checkpoint';
import {
	IRepository,
} from './repository';
import {
	IActor,
} from '../infrastructure/actor';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IAirEntity {
	
	// Id Properties
	_actorRecordId?: number;

	// Id Relations
	repository: IRepository;
	actor: IActor;

	// Non-Id Properties
	ageSuitability?: number;
	createdAt?: Date;
	systemWideOperationId?: number;
	originalActorRecordId?: number;

	// Non-Id Relations
	originalRepository?: IRepository;
	originalActor?: IActor;

	// Transient Properties
	id?: string;
	createdBy?: User;
	isNew?: boolean;

	// Public Methods
	
}


