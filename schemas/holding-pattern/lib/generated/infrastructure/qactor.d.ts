import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { IUser, UserEOptionalId, UserESelect, QUserQRelation, ITerminal, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '@airport/travel-document-checkpoint';
import { IActorApplication, ActorApplicationESelect, QActorApplication } from './qactorapplication';
import { IRepositoryActor, RepositoryActorESelect, QRepositoryActor } from '../repository/qrepositoryactor';
export interface IActor {
    id?: number;
    randomId?: number;
    user?: IUser;
    terminal?: ITerminal;
    actorApplications?: IActorApplication[];
    repositoryActor?: IRepositoryActor[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorESelect extends IEntitySelectProperties, ActorEOptionalId {
    randomId?: number | IQNumberField;
    user?: UserESelect;
    terminal?: TerminalESelect;
    actorApplications?: ActorApplicationESelect;
    repositoryActor?: RepositoryActorESelect;
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
    randomId?: number | IQNumberField;
    user?: UserEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorEUpdateColumns extends IEntityUpdateColumns {
    RANDOM_ID?: number | IQNumberField;
    USER_ID?: number | IQNumberField;
    TERMINAL_ID?: number | IQNumberField;
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
export interface QActor extends IQEntity {
    id: IQNumberField;
    randomId: IQNumberField;
    user: QUserQRelation;
    terminal: QTerminalQRelation;
    actorApplications: IQOneToManyRelation<QActorApplication>;
    repositoryActor: IQOneToManyRelation<QRepositoryActor>;
}
export interface QActorQId {
    id: IQNumberField;
}
export interface QActorQRelation extends IQRelation<QActor>, QActorQId {
}
