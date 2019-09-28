import {
	ISharingMessage,
} from './sharingmessage';
import {
	IRepositoryTransactionBlock,
} from '../repositorytransactionblock/repositorytransactionblock';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingMessageRepoTransBlock {
	
	// Id Properties

	// Id Relations
	sharingMessage: ISharingMessage;
	repositoryTransactionBlock: IRepositoryTransactionBlock;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


