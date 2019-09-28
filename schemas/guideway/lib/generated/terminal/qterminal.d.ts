import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { UserEOptionalId, UserESelect, QUserQRelation } from '../user/quser';
import { TerminalRepositoryECascadeGraph, TerminalRepositoryESelect, QTerminalRepository } from './qterminalrepository';
import { AgtSharingMessageECascadeGraph, AgtSharingMessageESelect, QAgtSharingMessage } from '../synchronization/qagtsharingmessage';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect extends IEntitySelectProperties, TerminalEOptionalId {
    name?: string | IQStringField;
    secondId?: number | IQNumberField;
    password?: string | IQStringField;
    lastPollConnectionDatetime?: number | IQNumberField;
    lastSseConnectionDatetime?: number | IQNumberField;
    user?: UserESelect;
    terminalRepositories?: TerminalRepositoryESelect;
    sharingMessages?: AgtSharingMessageESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TerminalEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
    secondId?: number | IQNumberField;
    password?: string | IQStringField;
    lastPollConnectionDatetime?: number | IQNumberField;
    lastSseConnectionDatetime?: number | IQNumberField;
    user?: UserEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalECascadeGraph extends IEntityCascadeGraph {
    terminalRepositories?: TerminalRepositoryECascadeGraph;
    sharingMessages?: AgtSharingMessageECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
    SECOND_ID?: number | IQNumberField;
    PASSWORD?: string | IQStringField;
    LAST_RECENT_CONNECTION_DATETIME?: number | IQNumberField;
    LAST_ARCHIVE_CONNECTION_DATETIME?: number | IQNumberField;
    USER_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalECreateProperties extends Partial<TerminalEId>, TerminalEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalECreateColumns extends TerminalEId, TerminalEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminal extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
    secondId: IQNumberField;
    password: IQStringField;
    lastPollConnectionDatetime: IQNumberField;
    lastSseConnectionDatetime: IQNumberField;
    user: QUserQRelation;
    terminalRepositories: IQOneToManyRelation<QTerminalRepository>;
    sharingMessages: IQOneToManyRelation<QAgtSharingMessage>;
}
export interface QTerminalQId {
    id: IQNumberField;
}
export interface QTerminalQRelation extends IQRelation<QTerminal>, QTerminalQId {
}
