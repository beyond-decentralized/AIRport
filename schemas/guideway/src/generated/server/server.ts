import {
	IServerSyncLog,
} from './serversynclog';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IServer {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	serverType?: number;

	// Non-Id Relations
	serverSyncLogs?: IServerSyncLog[];

	// Transient Properties

	// Public Methods
	
}


