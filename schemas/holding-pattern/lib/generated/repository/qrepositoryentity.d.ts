import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRepositoryEntityRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { ActorGraph, ActorEId, ActorEOptionalId, ActorESelect, QActorQId, QActorQRelation } from '../infrastructure/qactor';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryEntityESelect extends IEntitySelectProperties, RepositoryEntityEOptionalId {
    ageSuitability?: number | IQNumberField;
    systemWideOperationId?: number | IQNumberField;
    originalActorRecordId?: number | IQNumberField;
    repository?: RepositoryESelect;
    actor?: ActorESelect;
    originalRepository?: RepositoryESelect;
    originalActor?: ActorESelect;
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
    ageSuitability?: number | IQNumberField;
    systemWideOperationId?: number | IQNumberField;
    originalActorRecordId?: number | IQNumberField;
    originalRepository?: RepositoryEOptionalId;
    originalActor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryEntityGraph extends RepositoryEntityEOptionalId, IEntityCascadeGraph {
    ageSuitability?: number | IQNumberField;
    systemWideOperationId?: number | IQNumberField;
    originalActorRecordId?: number | IQNumberField;
    repository?: RepositoryGraph;
    actor?: ActorGraph;
    originalRepository?: RepositoryGraph;
    originalActor?: ActorGraph;
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
export interface QRepositoryEntity<T> extends IQEntity<T> {
    actorRecordId: IQNumberField;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
    ageSuitability: IQNumberField;
    systemWideOperationId: IQNumberField;
    originalActorRecordId: IQNumberField;
    originalRepository: QRepositoryQRelation;
    originalActor: QActorQRelation;
}
export interface QRepositoryEntityQId {
    actorRecordId: IQNumberField;
    repository: QRepositoryQId;
    actor: QActorQId;
}
export interface QRepositoryEntityQRelation<SubType, SubQType extends IQEntity<SubType>> extends IQRepositoryEntityRelation<SubType, SubQType>, QRepositoryEntityQId {
}
//# sourceMappingURL=qrepositoryentity.d.ts.map