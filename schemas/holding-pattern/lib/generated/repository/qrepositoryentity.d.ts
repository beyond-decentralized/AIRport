import { IQEntityInternal, IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { IActor, ActorEId, ActorEOptionalId, ActorESelect, QActorQId, QActorQRelation } from '../infrastructure/qactor';
export interface IRepositoryEntity {
    actorRecordId?: number;
    repository?: IRepository;
    actor?: IActor;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryEntityESelect extends IEntitySelectProperties, RepositoryEntityEOptionalId {
    repository?: RepositoryESelect;
    actor?: ActorESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEntityEId extends IEntityIdProperties {
    actorRecordId: number | IQNumberField;
    repository: RepositoryEId;
    actor: ActorEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEntityEOptionalId {
    actorRecordId?: number | IQNumberField;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEntityEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEntityEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryEntityECreateProperties extends Partial<RepositoryEntityEId>, RepositoryEntityEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryEntityECreateColumns extends RepositoryEntityEId, RepositoryEntityEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryEntity extends QEntity {
    actorRecordId: IQNumberField;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
}
export interface QRepositoryEntityQId {
    actorRecordId: IQNumberField;
    repository: QRepositoryQId;
    actor: QActorQId;
}
export interface QRepositoryEntityQRelation<SubType extends IQEntityInternal> extends QRelation<SubType>, QRepositoryEntityQId {
}
