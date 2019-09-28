import {
	ITerminal,
} from '@airport/travel-document-checkpoint';
import {
	IRepository,
	IRepositoryTransactionHistory,
} from '@airport/holding-pattern';
import {
	ISharingNodeRepoTransBlock,
} from '../sharingnode/sharingnoderepotransblock';
import {
	ISharingMessageRepoTransBlock,
} from '../sharingmessage/sharingmessagerepotransblock';
import {
	IMissingRecordRepoTransBlock,
} from '../missingrecord/missingrecordrepotransblock';
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
	syncOutcomeType?: number;
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


