import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation, TerminalGraph, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '@airport/travel-document-checkpoint';
import { SchemaGraph, SchemaEOptionalId, SchemaESelect, QSchemaQRelation } from '@airport/airspace';
import { Actor } from '../../ddl/infrastructure/Actor';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorESelect extends IEntitySelectProperties, ActorEOptionalId {
    uuId?: string | IQStringField;
    user?: UserESelect;
    terminal?: TerminalESelect;
    schema?: SchemaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ActorEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorEUpdateProperties extends IEntityUpdateProperties {
    uuId?: string | IQStringField;
    user?: UserEOptionalId;
    terminal?: TerminalEOptionalId;
    schema?: SchemaEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ActorGraph extends ActorEOptionalId, IEntityCascadeGraph {
    uuId?: string | IQStringField;
    user?: UserGraph;
    terminal?: TerminalGraph;
    schema?: SchemaGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorEUpdateColumns extends IEntityUpdateColumns {
    UU_ID?: string | IQStringField;
    USER_ID?: number | IQNumberField;
    TERMINAL_ID?: number | IQNumberField;
    SCHEMA_INDEX?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ActorECreateProperties extends Partial<ActorEId>, ActorEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ActorECreateColumns extends ActorEId, ActorEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QActor extends IQEntity<Actor> {
    id: IQNumberField;
    uuId: IQStringField;
    user: QUserQRelation;
    terminal: QTerminalQRelation;
    schema: QSchemaQRelation;
}
export interface QActorQId {
    id: IQNumberField;
}
export interface QActorQRelation extends IQRelation<Actor, QActor>, QActorQId {
}
//# sourceMappingURL=qactor.d.ts.map