import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ITerminalRepository, TerminalRepositoryESelect, QTerminalRepository } from '../terminal/qterminalrepository';
import { IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, QAgtRepositoryTransactionBlock } from '../synchronization/qagtrepositorytransactionblock';
export interface IRepository {
    id?: number;
    lastUpdateTime?: Date;
    name?: string;
    status?: number;
    terminalRepositories?: ITerminalRepository[];
    repositoryTransactionBlocks?: IAgtRepositoryTransactionBlock[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect extends IEntitySelectProperties, RepositoryEOptionalId {
    lastUpdateTime?: Date | IQDateField;
    name?: string | IQStringField;
    status?: number | IQNumberField;
    terminalRepositories?: TerminalRepositoryESelect;
    repositoryTransactionBlocks?: AgtRepositoryTransactionBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdateProperties extends IEntityUpdateProperties {
    lastUpdateTime?: Date | IQDateField;
    name?: string | IQStringField;
    status?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns extends IEntityUpdateColumns {
    LAST_UPDATE_DATETIME?: Date | IQDateField;
    NAME?: string | IQStringField;
    STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreateProperties extends Partial<RepositoryEId>, RepositoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryECreateColumns extends RepositoryEId, RepositoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepository extends QEntity {
    id: IQNumberField;
    lastUpdateTime: IQDateField;
    name: IQStringField;
    status: IQNumberField;
    terminalRepositories: IQOneToManyRelation<QTerminalRepository>;
    repositoryTransactionBlocks: IQOneToManyRelation<QAgtRepositoryTransactionBlock>;
}
export interface QRepositoryQId {
    id: IQNumberField;
}
export interface QRepositoryQRelation extends QRelation<QRepository>, QRepositoryQId {
}
