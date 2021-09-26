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
	status?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


