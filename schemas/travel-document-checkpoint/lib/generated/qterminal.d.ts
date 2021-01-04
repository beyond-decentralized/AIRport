import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation } from './quser';
import { TerminalAgtGraph, TerminalAgtESelect, QTerminalAgt } from './qterminalagt';
import { TerminalAgt } from '../ddl/TerminalAgt';
import { UserTerminalGraph, UserTerminalESelect, QUserTerminal } from './quserterminal';
import { UserTerminal } from '../ddl/UserTerminal';
import { UserTerminalAgtGraph, UserTerminalAgtESelect, QUserTerminalAgt } from './quserterminalagt';
import { UserTerminalAgt } from '../ddl/UserTerminalAgt';
import { Terminal } from '../ddl/Terminal';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect extends IEntitySelectProperties, TerminalEOptionalId {
    name?: string | IQStringField;
    secondId?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserESelect;
    terminalAgts?: TerminalAgtESelect;
    userTerminal?: UserTerminalESelect;
    userTerminalAgt?: UserTerminalAgtESelect;
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
    isLocal?: boolean | IQBooleanField;
    owner?: UserEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalGraph extends TerminalEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    secondId?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserGraph;
    terminalAgts?: TerminalAgtGraph[];
    userTerminal?: UserTerminalGraph[];
    userTerminalAgt?: UserTerminalAgtGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
    SECOND_ID?: number | IQNumberField;
    IS_LOCAL?: boolean | IQBooleanField;
    OWNER_USER_ID?: number | IQNumberField;
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
export interface QTerminal extends IQEntity<Terminal> {
    id: IQNumberField;
    name: IQStringField;
    secondId: IQNumberField;
    isLocal: IQBooleanField;
    owner: QUserQRelation;
    terminalAgts: IQOneToManyRelation<TerminalAgt, QTerminalAgt>;
    userTerminal: IQOneToManyRelation<UserTerminal, QUserTerminal>;
    userTerminalAgt: IQOneToManyRelation<UserTerminalAgt, QUserTerminalAgt>;
}
export interface QTerminalQId {
    id: IQNumberField;
}
export interface QTerminalQRelation extends IQRelation<Terminal, QTerminal>, QTerminalQId {
}
//# sourceMappingURL=qterminal.d.ts.map