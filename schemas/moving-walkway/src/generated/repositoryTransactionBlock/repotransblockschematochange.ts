import {
	IRepositoryTransactionBlock,
} from './repositorytransactionblock';
import {
	ISchema,
} from '@airport/traffic-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepoTransBlockSchemaToChange {
	
	// Id Properties

	// Id Relations
	repositoryTransactionBlock: IRepositoryTransactionBlock;
	schema: ISchema;

	// Non-Id Properties
	status?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


