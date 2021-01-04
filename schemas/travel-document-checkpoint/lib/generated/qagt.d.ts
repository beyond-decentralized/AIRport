import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { TerminalAgtGraph, TerminalAgtESelect, QTerminalAgt } from './qterminalagt';
import { TerminalAgt } from '../ddl/TerminalAgt';
import { UserTerminalAgtGraph, UserTerminalAgtESelect, QUserTerminalAgt } from './quserterminalagt';
import { UserTerminalAgt } from '../ddl/UserTerminalAgt';
import { Agt } from '../ddl/Agt';
/**
 * SELECT - All fields and relations (optional).
 */
export interface AgtESelect extends IEntitySelectProperties, AgtEOptionalId {
    address?: string | IQStringField;
    terminalAgts?: TerminalAgtESelect;
    userTerminalAgts?: UserTerminalAgtESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgtEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface AgtEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgtEUpdateProperties extends IEntityUpdateProperties {
    address?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AgtGraph extends AgtEOptionalId, IEntityCascadeGraph {
    address?: string | IQStringField;
    terminalAgts?: TerminalAgtGraph[];
    userTerminalAgts?: UserTerminalAgtGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface AgtEUpdateColumns extends IEntityUpdateColumns {
    ADDRESS?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgtECreateProperties extends Partial<AgtEId>, AgtEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgtECreateColumns extends AgtEId, AgtEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgt extends IQEntity<Agt> {
    id: IQNumberField;
    address: IQStringField;
    terminalAgts: IQOneToManyRelation<TerminalAgt, QTerminalAgt>;
    userTerminalAgts: IQOneToManyRelation<UserTerminalAgt, QUserTerminalAgt>;
}
export interface QAgtQId {
    id: IQNumberField;
}
export interface QAgtQRelation extends IQRelation<Agt, QAgt>, QAgtQId {
}
//# sourceMappingURL=qagt.d.ts.map