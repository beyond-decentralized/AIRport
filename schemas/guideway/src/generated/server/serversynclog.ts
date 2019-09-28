import {
	IServer,
} from './server';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IServerSyncLog {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	type?: number;
	startDatetime?: Date;
	endDatetime?: Date;
	numberOfConnections?: number;
	numberOfRecords?: number;
	dataCharsTotal?: number;

	// Non-Id Relations
	server?: IServer;

	// Transient Properties

	// Public Methods
	
}


