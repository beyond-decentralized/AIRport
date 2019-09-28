import {
	IRepository,
} from '../repository/repository';
import {
	ITerminalRepository,
} from '../terminal/terminalrepository';
import {
	ITerminal,
} from '../terminal/terminal';
import {
	IServer,
} from '../server/server';
import {
	ISyncLog,
} from './synclog';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IAgtRepositoryTransactionBlock {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	archivingStatus?: number;
	addDatetime?: number;
	tmRepositoryTransactionBlockId?: number;
	contents?: string;

	// Non-Id Relations
	repository?: IRepository;
	terminalRepositories?: ITerminalRepository[];
	terminal?: ITerminal;
	archivingServer?: IServer;
	syncLogs?: ISyncLog[];

	// Transient Properties

	// Public Methods
	
}


