import {
	IStageable,
} from '../infrastructure/stageable';
import {
	IRepository,
} from './repository';
import {
	IActor,
} from '../infrastructure/actor';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryEntity extends IStageable {
	
	// Id Properties
	actorRecordId: number;

	// Id Relations
	repository: IRepository;
	actor: IActor;

	// Non-Id Properties
	ageSuitability?: number;
	systemWideOperationId?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


