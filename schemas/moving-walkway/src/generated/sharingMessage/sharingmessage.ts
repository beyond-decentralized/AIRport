import {
	ISharingNode,
} from '../sharingnode/sharingnode';
import {
	ISharingMessageRepoTransBlock,
} from './sharingmessagerepotransblock';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingMessage {
	
	// Id Properties
	id: number;

	// Id Relations
	sharingNode: ISharingNode;

	// Non-Id Properties
	origin?: number;
	agtSharingMessageId?: number;
	syncTimestamp?: Date;

	// Non-Id Relations
	sharingMessageRepoTransBlocks?: ISharingMessageRepoTransBlock[];

	// Transient Properties

	// Public Methods
	
}


