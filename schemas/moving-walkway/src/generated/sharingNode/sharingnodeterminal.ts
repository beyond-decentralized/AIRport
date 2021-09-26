import {
	ISharingNode,
} from './sharingnode';
import {
	ITerminal,
} from '@airport/travel-document-checkpoint';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingNodeTerminal {
	
	// Id Properties

	// Id Relations
	sharingNode: ISharingNode;
	terminal: ITerminal;

	// Non-Id Properties
	agtTerminalId?: number;
	agtTerminalPassword?: string;
	terminalSyncStatus?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


