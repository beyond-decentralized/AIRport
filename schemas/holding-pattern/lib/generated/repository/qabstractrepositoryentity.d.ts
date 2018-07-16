import { IQEntityInternal, IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { IActor, ActorEId, ActorEOptionalId, ActorESelect, QActorQId, QActorQRelation } from '../infrastructure/qactor';
export interface IAbstractRepositoryEntity {
    actorRecordId?: number;
    repository?: IRepository;
    actor?: IActor;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface AbstractRepositoryEntityESelect extends IEntitySelectProperties, AbstractRepositoryEntityEOptionalId, AbstractRepositoryEntityEUpdateProperties {
    repository?: RepositoryESelect;
    actor?: ActorESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AbstractRepositoryEntityEId extends IEntityIdProperties {
    actorRecordId: number | IQNumberField;
    repository: RepositoryEId;
    actor: ActorEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface AbstractRepositoryEntityEOptionalId {
    actorRecordId?: number | IQNumberField;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AbstractRepositoryEntityEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface AbstractRepositoryEntityEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AbstractRepositoryEntityECreateProperties extends AbstractRepositoryEntityEId, AbstractRepositoryEntityEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AbstractRepositoryEntityECreateColumns extends AbstractRepositoryEntityEId, AbstractRepositoryEntityEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAbstractRepositoryEntity extends QEntity {
    actorRecordId: IQNumberField;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
}
export interface QAbstractRepositoryEntityQId {
    actorRecordId: IQNumberField;
    repository: QRepositoryQId;
    actor: QActorQId;
}
export interface QAbstractRepositoryEntityQRelation<SubType extends IQEntityInternal> extends QRelation<SubType>, QAbstractRepositoryEntityQId {
}
