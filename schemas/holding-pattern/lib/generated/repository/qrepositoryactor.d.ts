import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryActorESelect extends IEntitySelectProperties, RepositoryActorEOptionalId {
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryActorGraph extends RepositoryActorEOptionalId, IEntityCascadeGraph {
    repository?: RepositoryGraph;
    actor?: ActorGraph;
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
export interface QRepositoryActor extends IQEntity {
    id: IQNumberField;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
}
export interface QRepositoryActorQId {
    id: IQNumberField;
    repository: QRepositoryQId;
}
export interface QRepositoryActorQRelation extends IQRelation<QRepositoryActor>, QRepositoryActorQId {
}
//# sourceMappingURL=qrepositoryactor.d.ts.map