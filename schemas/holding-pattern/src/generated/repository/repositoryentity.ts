import {
	IRepository,
} from './repository';
import {
	IActor,
} from '../infrastructure/actor';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryEntity {
	
	// Id Properties
	actorRecordId: number;

	// Id Relations
	repository: IRepository;
	actor: IActor;

	// Non-Id Properties
	ageSuitability?: number;
	systemWideOperationId?: number;
	originalActorRecordId?: number;

	// Non-Id Relations
	originalRepository?: IRepository;
	originalActor?: IActor;

	// Transient Properties

	// Public Methods
	
}


