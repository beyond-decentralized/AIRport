import { IMissingRecord } from './missingrecord';
import { IRepositoryTransactionBlock } from '../repositorytransactionblock/repositorytransactionblock';
export interface IMissingRecordRepoTransBlock {
    missingRecord?: IMissingRecord;
    repositoryTransactionBlock?: IRepositoryTransactionBlock;
}
