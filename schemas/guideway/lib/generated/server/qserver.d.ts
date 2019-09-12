import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { IServerSyncLog, ServerSyncLogECascadeGraph, ServerSyncLogESelect, QServerSyncLog } from './qserversynclog';
export interface IServer {
    id: number;
    serverType?: number;
    serverSyncLogs?: IServerSyncLog[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ServerESelect extends IEntitySelectProperties, ServerEOptionalId {
    serverType?: number | IQNumberField;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ServerECascadeGraph extends IEntityCascadeGraph {
    serverSyncLogs?: ServerSyncLogECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ServerEUpdateColumns extends IEntityUpdateColumns {
    SERVER_TYPE?: number | IQNumberField;
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
export interface QServer extends IQEntity {
    id: IQNumberField;
    serverType: IQNumberField;
    serverSyncLogs: IQOneToManyRelation<QServerSyncLog>;
}
export interface QServerQId {
    id: IQNumberField;
}
export interface QServerQRelation extends IQRelation<QServer>, QServerQId {
}
