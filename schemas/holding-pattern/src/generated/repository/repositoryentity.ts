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
	originalActorRecordId: number;

	// Id Relations
	repository: IRepository;
	actor: IActor;
	originalActor: IActor;

	// Non-Id Properties
	ageSuitability?: number;
	systemWideOperationId?: number;

	// Non-Id Relations
	originalRepository?: IRepository;

	// Transient Properties

	// Public Methods
	
}


