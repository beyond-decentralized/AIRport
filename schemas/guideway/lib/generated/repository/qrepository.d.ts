import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ITerminalRepository, TerminalRepositoryECascadeGraph, TerminalRepositoryESelect, QTerminalRepository } from '../terminal/qterminalrepository';
import { IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockECascadeGraph, AgtRepositoryTransactionBlockESelect, QAgtRepositoryTransactionBlock } from '../synchronization/qagtrepositorytransactionblock';
export interface IRepository {
    id: number;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryECascadeGraph extends IEntityCascadeGraph {
    terminalRepositories?: TerminalRepositoryECascadeGraph;
    repositoryTransactionBlocks?: AgtRepositoryTransactionBlockECascadeGraph;
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
export interface QRepository extends IQEntity {
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
export interface QRepositoryQRelation extends IQRelation<QRepository>, QRepositoryQId {
}
