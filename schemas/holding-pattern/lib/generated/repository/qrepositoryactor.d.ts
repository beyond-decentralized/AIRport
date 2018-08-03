import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { IActor, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
export interface IRepositoryActor {
    id?: number;
    repository?: IRepository;
    actor?: IActor;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryActorESelect extends IEntitySelectProperties, RepositoryActorEOptionalId, RepositoryActorEUpdateProperties {
    repository?: RepositoryESelect;
    actor?: ActorESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryActorEId extends IEntityIdProperties {
    id: number | IQNumberField;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryActorEOptionalId {
    id?: number | IQNumberField;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryActorEUpdateProperties extends IEntityUpdateProperties {
    actor?: ActorEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryActorEUpdateColumns extends IEntityUpdateColumns {
    ACTOR_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryActorECreateProperties extends Partial<RepositoryActorEId>, RepositoryActorEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryActorECreateColumns extends RepositoryActorEId, RepositoryActorEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryActor extends QEntity {
    id: IQNumberField;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
}
export interface QRepositoryActorQId {
    id: IQNumberField;
    repository: QRepositoryQId;
}
export interface QRepositoryActorQRelation extends QRelation<QRepositoryActor>, QRepositoryActorQId {
}
