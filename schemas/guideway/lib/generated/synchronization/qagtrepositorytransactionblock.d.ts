import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { IRepository, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '../repository/qrepository';
import { ITerminalRepository, TerminalRepositoryESelect, QTerminalRepository } from '../terminal/qterminalrepository';
import { ITerminal, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '../terminal/qterminal';
import { IServer, ServerEOptionalId, ServerESelect, QServerQRelation } from '../server/qserver';
import { ISyncLog, SyncLogESelect, QSyncLog } from './qsynclog';
export interface IAgtRepositoryTransactionBlock {
    id?: number;
    archivingStatus?: number;
    addDatetime?: number;
    tmRepositoryTransactionBlockId?: number;
    contents?: string;
    repository?: IRepository;
    terminalRepositories?: ITerminalRepository[];
    terminal?: ITerminal;
    archivingServer?: IServer;
    syncLogs?: ISyncLog[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface AgtRepositoryTransactionBlockESelect extends IEntitySelectProperties, AgtRepositoryTransactionBlockEOptionalId, AgtRepositoryTransactionBlockEUpdateProperties {
    repository?: RepositoryESelect;
    terminalRepositories?: TerminalRepositoryESelect;
    terminal?: TerminalESelect;
    archivingServer?: ServerESelect;
    syncLogs?: SyncLogESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgtRepositoryTransactionBlockEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface AgtRepositoryTransactionBlockEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgtRepositoryTransactionBlockEUpdateProperties extends IEntityUpdateProperties {
    archivingStatus?: number | IQNumberField;
    addDatetime?: number | IQNumberField;
    tmRepositoryTransactionBlockId?: number | IQNumberField;
    contents?: string | IQStringField;
    repository?: RepositoryEOptionalId;
    terminal?: TerminalEOptionalId;
    archivingServer?: ServerEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface AgtRepositoryTransactionBlockEUpdateColumns extends IEntityUpdateColumns {
    ARCHIVING_STATUS?: number | IQNumberField;
    ADD_DATETIME?: number | IQNumberField;
    TM_REPOSITORY_TRANSACTION_BLOCK_ID?: number | IQNumberField;
    REPOSITORY_TRANSACTION_BLOCK?: string | IQStringField;
    REPOSITORY_ID?: number | IQNumberField;
    TERMINAL_ID?: number | IQNumberField;
    ARCHIVING_SERVER_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgtRepositoryTransactionBlockECreateProperties extends AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgtRepositoryTransactionBlockECreateColumns extends AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgtRepositoryTransactionBlock extends QEntity {
    id: IQNumberField;
    archivingStatus: IQNumberField;
    addDatetime: IQNumberField;
    tmRepositoryTransactionBlockId: IQNumberField;
    contents: IQStringField;
    repository: QRepositoryQRelation;
    terminalRepositories: IQOneToManyRelation<QTerminalRepository>;
    terminal: QTerminalQRelation;
    archivingServer: QServerQRelation;
    syncLogs: IQOneToManyRelation<QSyncLog>;
}
export interface QAgtRepositoryTransactionBlockQId {
    id: IQNumberField;
}
export interface QAgtRepositoryTransactionBlockQRelation extends QRelation<QAgtRepositoryTransactionBlock>, QAgtRepositoryTransactionBlockQId {
}
