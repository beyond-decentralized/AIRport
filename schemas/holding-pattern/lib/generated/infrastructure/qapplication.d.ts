import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ActorApplicationGraph, ActorApplicationESelect, QActorApplication } from './qactorapplication';
import { ActorApplication } from '../../ddl/infrastructure/ActorApplication';
import { RepositoryApplicationGraph, RepositoryApplicationESelect, QRepositoryApplication } from '../repository/qrepositoryapplication';
import { RepositoryApplication } from '../../ddl/repository/RepositoryApplication';
import { Application } from '../../ddl/infrastructure/Application';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationESelect extends IEntitySelectProperties, ApplicationEOptionalId {
    host?: string | IQStringField;
    port?: number | IQNumberField;
    actorApplications?: ActorApplicationESelect;
    repositoryApplications?: RepositoryApplicationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationEUpdateProperties extends IEntityUpdateProperties {
    host?: string | IQStringField;
    port?: number | IQNumberField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationGraph extends ApplicationEOptionalId, IEntityCascadeGraph {
    host?: string | IQStringField;
    port?: number | IQNumberField;
    actorApplications?: ActorApplicationGraph[];
    repositoryApplications?: RepositoryApplicationGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationEUpdateColumns extends IEntityUpdateColumns {
    HOST?: string | IQStringField;
    PORT?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationECreateProperties extends Partial<ApplicationEId>, ApplicationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationECreateColumns extends ApplicationEId, ApplicationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplication extends IQEntity<Application> {
    id: IQNumberField;
    host: IQStringField;
    port: IQNumberField;
    actorApplications: IQOneToManyRelation<ActorApplication, QActorApplication>;
    repositoryApplications: IQOneToManyRelation<RepositoryApplication, QRepositoryApplication>;
}
export interface QApplicationQId {
    id: IQNumberField;
}
export interface QApplicationQRelation extends IQRelation<Application, QApplication>, QApplicationQId {
}
//# sourceMappingURL=qapplication.d.ts.map