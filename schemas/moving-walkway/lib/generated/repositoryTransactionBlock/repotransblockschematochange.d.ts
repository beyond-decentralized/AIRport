import { IRepositoryTransactionBlock } from './repositorytransactionblock';
import { ISchema } from '@airport/traffic-pattern';
export interface IRepoTransBlockSchemaToChange {
    repositoryTransactionBlock: IRepositoryTransactionBlock;
    schema: ISchema;
    status?: number;
}
