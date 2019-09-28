import {
	ISharingNode,
} from './sharingnode';
import {
	IRepository,
} from '@airport/holding-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingNodeRepository {
	
	// Id Properties

	// Id Relations
	sharingNode: ISharingNode;
	repository: IRepository;

	// Non-Id Properties
	agtRepositoryId?: number;
	advisedSyncPriority?: number;
	repositorySyncStatus?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


