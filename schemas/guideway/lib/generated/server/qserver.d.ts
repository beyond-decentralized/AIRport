import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, QEntity, QRelation } from '@airport/air-control';
import { IServerSyncLog, ServerSyncLogESelect, QServerSyncLog } from './qserversynclog';
export interface IServer {
    id?: number;
    serverType?: number;
    serverSyncLogs?: IServerSyncLog[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ServerESelect extends IEntitySelectProperties, ServerEOptionalId, ServerEUpdateProperties {
    serverSyncLogs?: ServerSyncLogESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ServerEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ServerEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ServerEUpdateProperties extends IEntityUpdateProperties {
    serverType?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ServerEUpdateColumns extends IEntityUpdateColumns {
    SERVERTYPE?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ServerECreateProperties extends Partial<ServerEId>, ServerEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ServerECreateColumns extends ServerEId, ServerEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QServer extends QEntity {
    id: IQNumberField;
    serverType: IQNumberField;
    serverSyncLogs: IQOneToManyRelation<QServerSyncLog>;
}
export interface QServerQId {
    id: IQNumberField;
}
export interface QServerQRelation extends QRelation<QServer>, QServerQId {
}
