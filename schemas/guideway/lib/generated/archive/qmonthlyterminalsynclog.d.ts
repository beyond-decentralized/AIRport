import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { MonthlyArchiveLogEId, MonthlyArchiveLogEOptionalId, MonthlyArchiveLogESelect, QMonthlyArchiveLogQId, QMonthlyArchiveLogQRelation } from './qmonthlyarchivelog';
import { TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from '../terminal/qterminal';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MonthlyTerminalSyncLogESelect extends IEntitySelectProperties, MonthlyTerminalSyncLogEOptionalId {
    allAcknowledged?: boolean | IQBooleanField;
    dailySyncStatuses?: string | IQStringField;
    monthlyArchiveLog?: MonthlyArchiveLogESelect;
    terminal?: TerminalESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MonthlyTerminalSyncLogEId extends IEntityIdProperties {
    monthlyArchiveLog: MonthlyArchiveLogEId;
    terminal: TerminalEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface MonthlyTerminalSyncLogEOptionalId {
    monthlyArchiveLog?: MonthlyArchiveLogEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MonthlyTerminalSyncLogEUpdateProperties extends IEntityUpdateProperties {
    allAcknowledged?: boolean | IQBooleanField;
    dailySyncStatuses?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MonthlyTerminalSyncLogECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MonthlyTerminalSyncLogEUpdateColumns extends IEntityUpdateColumns {
    ALL_ACKNOWLEDGED?: boolean | IQBooleanField;
    DAILY_SYNC_STATUSES?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MonthlyTerminalSyncLogECreateProperties extends Partial<MonthlyTerminalSyncLogEId>, MonthlyTerminalSyncLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MonthlyTerminalSyncLogECreateColumns extends MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMonthlyTerminalSyncLog extends IQEntity {
    monthlyArchiveLog: QMonthlyArchiveLogQRelation;
    terminal: QTerminalQRelation;
    allAcknowledged: IQBooleanField;
    dailySyncStatuses: IQStringField;
}
export interface QMonthlyTerminalSyncLogQId {
    monthlyArchiveLog: QMonthlyArchiveLogQId;
    terminal: QTerminalQId;
}
export interface QMonthlyTerminalSyncLogQRelation extends IQRelation<QMonthlyTerminalSyncLog>, QMonthlyTerminalSyncLogQId {
}
//# sourceMappingURL=qmonthlyterminalsynclog.d.ts.map