import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { IServer, ServerECascadeGraph, ServerEOptionalId, ServerESelect, QServerQRelation } from './qserver';
export interface IServerSyncLog {
    id: number;
    type?: number;
    startDatetime?: Date;
    endDatetime?: Date;
    numberOfConnections?: number;
    numberOfRecords?: number;
    dataCharsTotal?: number;
    server?: IServer;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ServerSyncLogESelect extends IEntitySelectProperties, ServerSyncLogEOptionalId {
    type?: number | IQNumberField;
    startDatetime?: Date | IQDateField;
    endDatetime?: Date | IQDateField;
    numberOfConnections?: number | IQNumberField;
    numberOfRecords?: number | IQNumberField;
    dataCharsTotal?: number | IQNumberField;
    server?: ServerESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ServerSyncLogEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ServerSyncLogEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ServerSyncLogEUpdateProperties extends IEntityUpdateProperties {
    type?: number | IQNumberField;
    startDatetime?: Date | IQDateField;
    endDatetime?: Date | IQDateField;
    numberOfConnections?: number | IQNumberField;
    numberOfRecords?: number | IQNumberField;
    dataCharsTotal?: number | IQNumberField;
    server?: ServerEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ServerSyncLogECascadeGraph extends IEntityCascadeGraph {
    server?: ServerECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ServerSyncLogEUpdateColumns extends IEntityUpdateColumns {
    TYPE?: number | IQNumberField;
    START_DATETIME?: Date | IQDateField;
    PROCESSED_DATETIME?: Date | IQDateField;
    NUMBER_OF_CONNECTIONS?: number | IQNumberField;
    NUMBER_OF_SYNC_RECORDS?: number | IQNumberField;
    DATA_CHARS_TOTAL?: number | IQNumberField;
    SERVER_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ServerSyncLogECreateProperties extends Partial<ServerSyncLogEId>, ServerSyncLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ServerSyncLogECreateColumns extends ServerSyncLogEId, ServerSyncLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QServerSyncLog extends IQEntity {
    id: IQNumberField;
    type: IQNumberField;
    startDatetime: IQDateField;
    endDatetime: IQDateField;
    numberOfConnections: IQNumberField;
    numberOfRecords: IQNumberField;
    dataCharsTotal: IQNumberField;
    server: QServerQRelation;
}
export interface QServerSyncLogQId {
    id: IQNumberField;
}
export interface QServerSyncLogQRelation extends IQRelation<QServerSyncLog>, QServerSyncLogQId {
}
