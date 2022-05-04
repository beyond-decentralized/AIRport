import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { DomainGraph, DomainEOptionalId, DomainESelect, QDomainQRelation } from './qdomain';
import { ApplicationVersionGraph, ApplicationVersionESelect, QApplicationVersion } from './qapplicationversion';
import { ApplicationCurrentVersionGraph, ApplicationCurrentVersionESelect, QApplicationCurrentVersion } from './qapplicationcurrentversion';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationESelect extends IEntitySelectProperties, ApplicationEOptionalId {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    fullName?: string | IQStringField;
    status?: string | IQStringField;
    signature?: string | IQStringField;
    domain?: DomainESelect;
    versions?: ApplicationVersionESelect;
    currentVersion?: ApplicationCurrentVersionESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationEId extends IEntityIdProperties {
    index: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationEOptionalId {
    index?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationEUpdateProperties extends IEntityUpdateProperties {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    fullName?: string | IQStringField;
    status?: string | IQStringField;
    signature?: string | IQStringField;
    domain?: DomainEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationGraph extends ApplicationEOptionalId, IEntityCascadeGraph {
    scope?: string | IQStringField;
    name?: string | IQStringField;
    fullName?: string | IQStringField;
    status?: string | IQStringField;
    signature?: string | IQStringField;
    domain?: DomainGraph;
    versions?: ApplicationVersionGraph[];
    currentVersion?: ApplicationCurrentVersionGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationEUpdateColumns extends IEntityUpdateColumns {
    SCOPE?: string | IQStringField;
    APPLICATION_NAME?: string | IQStringField;
    FULL_APPLICATION_NAME?: string | IQStringField;
    STATUS?: string | IQStringField;
    SIGNATURE?: string | IQStringField;
    DOMAIN_ID?: number | IQNumberField;
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
export interface QApplication extends IQEntity {
    index: IQNumberField;
    scope: IQStringField;
    name: IQStringField;
    fullName: IQStringField;
    status: IQStringField;
    signature: IQStringField;
    domain: QDomainQRelation;
    versions: IQOneToManyRelation<QApplicationVersion>;
    currentVersion: IQOneToManyRelation<QApplicationCurrentVersion>;
}
export interface QApplicationQId {
    index: IQNumberField;
}
export interface QApplicationQRelation extends IQRelation<QApplication>, QApplicationQId {
}
//# sourceMappingURL=qapplication.d.ts.map