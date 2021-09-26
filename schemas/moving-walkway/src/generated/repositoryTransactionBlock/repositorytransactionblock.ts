import {
	ITerminal,
} from '@airport/travel-document-checkpoint';
import {
	IRepository,
	IRepositoryTransactionHistory,
} from '@airport/holding-pattern';
import {
	ISharingNodeRepoTransBlock,
} from '../sharingNode/sharingnoderepotransblock';
import {
	ISharingMessageRepoTransBlock,
} from '../sharingMessage/sharingmessagerepotransblock';
import {
	IMissingRecordRepoTransBlock,
} from '../missingRecord/missingrecordrepotransblock';
import {
	IRepoTransBlockSchemaToChange,
} from './repotransblockschematochange';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryTransactionBlock {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	sourceId?: number;
	hash?: string;
	syncOutcomeType?: string;
	contents?: string;

	// Non-Id Relations
	source?: ITerminal;
	repository?: IRepository;
	repositoryTransactionHistory?: IRepositoryTransactionHistory;
	sharingNodeRepoTransBlocks?: ISharingNodeRepoTransBlock[];
	sharingMessageRepoTransBlocks?: ISharingMessageRepoTransBlock[];
	missingRecordRepoTransBlocks?: IMissingRecordRepoTransBlock[];
	repoTransBlockSchemasToChange?: IRepoTransBlockSchemaToChange[];

	// Transient Properties

	// Public Methods
	
}


