import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { ITerminal, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '../terminal/qterminal';
import { ISyncLog, SyncLogESelect, QSyncLog } from './qsynclog';
export interface IAgtSharingMessage {
    id?: number;
    tmSharingMessageId?: number;
    acknowledged?: number;
    terminal?: ITerminal;
    syncLogs?: ISyncLog[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface AgtSharingMessageESelect extends IEntitySelectProperties, AgtSharingMessageEOptionalId {
    tmSharingMessageId?: number | IQNumberField;
    acknowledged?: number | IQNumberField;
    terminal?: TerminalESelect;
    syncLogs?: SyncLogESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgtSharingMessageEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface AgtSharingMessageEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgtSharingMessageEUpdateProperties extends IEntityUpdateProperties {
    tmSharingMessageId?: number | IQNumberField;
    acknowledged?: number | IQNumberField;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface AgtSharingMessageEUpdateColumns extends IEntityUpdateColumns {
    TM_SHARING_MESSAGE_ID?: number | IQNumberField;
    ACKNOWLEDGED?: number | IQNumberField;
    SYNCED_TERMINAL_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgtSharingMessageECreateProperties extends Partial<AgtSharingMessageEId>, AgtSharingMessageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgtSharingMessageECreateColumns extends AgtSharingMessageEId, AgtSharingMessageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgtSharingMessage extends IQEntity {
    id: IQNumberField;
    tmSharingMessageId: IQNumberField;
    acknowledged: IQNumberField;
    terminal: QTerminalQRelation;
    syncLogs: IQOneToManyRelation<QSyncLog>;
}
export interface QAgtSharingMessageQId {
    id: IQNumberField;
}
export interface QAgtSharingMessageQRelation extends IQRelation<QAgtSharingMessage>, QAgtSharingMessageQId {
}
