import { ITerminal } from '@airport/travel-document-checkpoint';
import { IRepository, IRepositoryTransactionHistory } from '@airport/holding-pattern';
import { ISharingNodeRepoTransBlock } from '../sharingnode/sharingnoderepotransblock';
import { ISharingMessageRepoTransBlock } from '../sharingmessage/sharingmessagerepotransblock';
import { IMissingRecordRepoTransBlock } from '../missingrecord/missingrecordrepotransblock';
import { IRepoTransBlockSchemaToChange } from './repotransblockschematochange';
export interface IRepositoryTransactionBlock {
    id: number;
    sourceId?: number;
    hash?: string;
    syncOutcomeType?: number;
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