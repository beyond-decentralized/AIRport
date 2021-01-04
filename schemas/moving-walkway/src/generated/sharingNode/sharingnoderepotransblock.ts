import {
	ISharingNode,
} from './sharingnode';
import {
	IRepositoryTransactionBlock,
} from '../repositoryTransactionBlock/repositorytransactionblock';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingNodeRepoTransBlock {
	
	// Id Properties

	// Id Relations
	sharingNode: ISharingNode;
	repositoryTransactionBlock: IRepositoryTransactionBlock;

	// Non-Id Properties
	syncStatus?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


