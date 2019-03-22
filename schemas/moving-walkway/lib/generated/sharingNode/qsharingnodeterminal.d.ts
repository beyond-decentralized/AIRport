import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ISharingNode, SharingNodeEId, SharingNodeEOptionalId, SharingNodeESelect, QSharingNodeQId, QSharingNodeQRelation } from './qsharingnode';
import { ITerminal, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from '@airport/travel-document-checkpoint';
export interface ISharingNodeTerminal {
    sharingNode?: ISharingNode;
    terminal?: ITerminal;
    agtTerminalId?: number;
    agtTerminalPassword?: string;
    terminalSyncStatus?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeTerminalESelect extends IEntitySelectProperties, SharingNodeTerminalEOptionalId {
    agtTerminalId?: number | IQNumberField;
    agtTerminalPassword?: string | IQStringField;
    terminalSyncStatus?: number | IQNumberField;
    sharingNode?: SharingNodeESelect;
    terminal?: TerminalESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeTerminalEId extends IEntityIdProperties {
    sharingNode: SharingNodeEId;
    terminal: TerminalEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeTerminalEOptionalId {
    sharingNode?: SharingNodeEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeTerminalEUpdateProperties extends IEntityUpdateProperties {
    agtTerminalId?: number | IQNumberField;
    agtTerminalPassword?: string | IQStringField;
    terminalSyncStatus?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeTerminalEUpdateColumns extends IEntityUpdateColumns {
    AGT_TERMINAL_ID?: number | IQNumberField;
    TERMINAL_PASSWORD?: string | IQStringField;
    TERMINAL_SYNC_STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeTerminalECreateProperties extends Partial<SharingNodeTerminalEId>, SharingNodeTerminalEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeTerminalECreateColumns extends SharingNodeTerminalEId, SharingNodeTerminalEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeTerminal extends QEntity {
    sharingNode: QSharingNodeQRelation;
    terminal: QTerminalQRelation;
    agtTerminalId: IQNumberField;
    agtTerminalPassword: IQStringField;
    terminalSyncStatus: IQNumberField;
}
export interface QSharingNodeTerminalQId {
    sharingNode: QSharingNodeQId;
    terminal: QTerminalQId;
}
export interface QSharingNodeTerminalQRelation extends QRelation<QSharingNodeTerminal>, QSharingNodeTerminalQId {
}
