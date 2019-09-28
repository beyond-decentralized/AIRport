import {
	ITerminalRepository,
} from '../terminal/terminalrepository';
import {
	IAgtRepositoryTransactionBlock,
} from '../synchronization/agtrepositorytransactionblock';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepository {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	lastUpdateTime?: Date;
	name?: string;
	status?: number;

	// Non-Id Relations
	terminalRepositories?: ITerminalRepository[];
	repositoryTransactionBlocks?: IAgtRepositoryTransactionBlock[];

	// Transient Properties

	// Public Methods
	
}


