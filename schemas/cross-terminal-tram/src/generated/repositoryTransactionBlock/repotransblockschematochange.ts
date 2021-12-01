import {
	IRepositoryTransactionBlock,
} from './repositorytransactionblock';
import {
	IApplication,
} from '@airport/traffic-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepoTransBlockApplicationToChange {
	
	// Id Properties

	// Id Relations
	repositoryTransactionBlock: IRepositoryTransactionBlock;
	application: IApplication;

	// Non-Id Properties
	status?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


