import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '../repository/qrepository';
import { TerminalRepositoryGraph, TerminalRepositoryESelect, QTerminalRepository } from '../terminal/qterminalrepository';
import { TerminalRepository } from '../../ddl/terminal/TerminalRepository';
import { TerminalGraph, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '../terminal/qterminal';
import { ServerGraph, ServerEOptionalId, ServerESelect, QServerQRelation } from '../server/qserver';
import { SyncLogGraph, SyncLogESelect, QSyncLog } from './qsynclog';
import { SyncLog } from '../../ddl/synchronization/SyncLog';
import { AgtRepositoryTransactionBlock } from '../../ddl/synchronization/AgtRepositoryTransactionBlock';
/**
 * SELECT - All fields and relations (optional).
 */
export interface AgtRepositoryTransactionBlockESelect extends IEntitySelectProperties, AgtRepositoryTransactionBlockEOptionalId {
    archivingStatus?: number | IQNumberField;
    addDatetime?: number | IQNumberField;
    tmRepositoryTransactionBlockId?: number | IQNumberField;
    contents?: string | IQStringField;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AgtRepositoryTransactionBlockGraph extends AgtRepositoryTransactionBlockEOptionalId, IEntityCascadeGraph {
    archivingStatus?: number | IQNumberField;
    addDatetime?: number | IQNumberField;
    tmRepositoryTransactionBlockId?: number | IQNumberField;
    contents?: string | IQStringField;
    repository?: RepositoryGraph;
    terminalRepositories?: TerminalRepositoryGraph[];
    terminal?: TerminalGraph;
    archivingServer?: ServerGraph;
    syncLogs?: SyncLogGraph[];
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
export interface AgtRepositoryTransactionBlockECreateProperties extends Partial<AgtRepositoryTransactionBlockEId>, AgtRepositoryTransactionBlockEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgtRepositoryTransactionBlockECreateColumns extends AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgtRepositoryTransactionBlock extends IQEntity<AgtRepositoryTransactionBlock> {
    id: IQNumberField;
    archivingStatus: IQNumberField;
    addDatetime: IQNumberField;
    tmRepositoryTransactionBlockId: IQNumberField;
    contents: IQStringField;
    repository: QRepositoryQRelation;
    terminalRepositories: IQOneToManyRelation<TerminalRepository, QTerminalRepository>;
    terminal: QTerminalQRelation;
    archivingServer: QServerQRelation;
    syncLogs: IQOneToManyRelation<SyncLog, QSyncLog>;
}
export interface QAgtRepositoryTransactionBlockQId {
    id: IQNumberField;
}
export interface QAgtRepositoryTransactionBlockQRelation extends IQRelation<AgtRepositoryTransactionBlock, QAgtRepositoryTransactionBlock>, QAgtRepositoryTransactionBlockQId {
}
//# sourceMappingURL=qagtrepositorytransactionblock.d.ts.map