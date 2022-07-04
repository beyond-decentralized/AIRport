import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, IQEntity, IQAirEntityRelation } from '@airport/air-traffic-control';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { ActorGraph, ActorEId, ActorEOptionalId, ActorESelect, QActorQId, QActorQRelation } from '../infrastructure/qactor';
/**
 * SELECT - All fields and relations (optional).
 */
export interface AirEntityESelect extends IEntitySelectProperties, AirEntityEOptionalId {
    ageSuitability?: number | IQNumberField;
    createdAt?: Date | IQDateField;
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
export interface AirEntityEId extends IEntityIdProperties {
    _actorRecordId: number | IQNumberField;
    repository: RepositoryEId;
    actor: ActorEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface AirEntityEOptionalId {
    _actorRecordId?: number | IQNumberField;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AirEntityEUpdateProperties extends IEntityUpdateProperties {
    ageSuitability?: number | IQNumberField;
    createdAt?: Date | IQDateField;
    systemWideOperationId?: number | IQNumberField;
    originalActorRecordId?: number | IQNumberField;
    originalRepository?: RepositoryEOptionalId;
    originalActor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AirEntityGraph extends AirEntityEOptionalId, IEntityCascadeGraph {
    ageSuitability?: number | IQNumberField;
    createdAt?: Date | IQDateField;
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
export interface AirEntityEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AirEntityECreateProperties extends Partial<AirEntityEId>, AirEntityEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AirEntityECreateColumns extends AirEntityEId, AirEntityEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QAirEntity extends IQEntity {
    _actorRecordId: IQNumberField;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
    ageSuitability: IQNumberField;
    createdAt: IQDateField;
    systemWideOperationId: IQNumberField;
    originalActorRecordId: IQNumberField;
    originalRepository: QRepositoryQRelation;
    originalActor: QActorQRelation;
}
export interface QAirEntityQId {
    _actorRecordId: IQNumberField;
    repository: QRepositoryQId;
    actor: QActorQId;
}
export interface QAirEntityQRelation<SubType, SubQType extends IQEntity> extends IQAirEntityRelation<SubType, SubQType>, QAirEntityQId {
}
//# sourceMappingURL=qrepositoryentity.d.ts.map