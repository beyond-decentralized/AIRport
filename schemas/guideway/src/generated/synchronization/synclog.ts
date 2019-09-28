import {
	IAgtSharingMessage,
} from './agtsharingmessage';
import {
	IAgtRepositoryTransactionBlock,
} from './agtrepositorytransactionblock';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISyncLog {
	
	// Id Properties

	// Id Relations
	sharingMessage: IAgtSharingMessage;
	repositoryTransactionBlock: IAgtRepositoryTransactionBlock;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


