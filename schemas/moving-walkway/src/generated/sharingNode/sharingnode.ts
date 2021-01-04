import {
	ISharingMessage,
} from '../sharingMessage/sharingmessage';
import {
	ISharingNodeRepoTransBlock,
} from './sharingnoderepotransblock';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingNode {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	sharingMechanism?: number;
	isActive?: boolean;
	syncFrequency?: number;
	connectionProtocol?: number;
	connectionUrl?: string;

	// Non-Id Relations
	messages?: ISharingMessage[];
	sharingNodeRepoTransBlocks?: ISharingNodeRepoTransBlock[];

	// Transient Properties

	// Public Methods
	
}


