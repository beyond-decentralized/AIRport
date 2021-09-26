import { ITerminal } from '@airport/travel-document-checkpoint';
import { IRepository, IRepositoryTransactionHistory } from '@airport/holding-pattern';
import { ISharingNodeRepoTransBlock } from '../sharingNode/sharingnoderepotransblock';
import { ISharingMessageRepoTransBlock } from '../sharingMessage/sharingmessagerepotransblock';
import { IMissingRecordRepoTransBlock } from '../missingRecord/missingrecordrepotransblock';
import { IRepoTransBlockSchemaToChange } from './repotransblockschematochange';
export interface IRepositoryTransactionBlock {
    id: number;
    sourceId?: number;
    hash?: string;
    syncOutcomeType?: string;
    contents?: string;
    source?: ITerminal;
    repository?: IRepository;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
    sharingNodeRepoTransBlocks?: ISharingNodeRepoTransBlock[];
    sharingMessageRepoTransBlocks?: ISharingMessageRepoTransBlock[];
    missingRecordRepoTransBlocks?: IMissingRecordRepoTransBlock[];
    repoTransBlockSchemasToChange?: IRepoTransBlockSchemaToChange[];
}
//# sourceMappingURL=repositorytransactionblock.d.ts.map