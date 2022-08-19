import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { DomainGraph, DomainEOptionalId, DomainESelect, QDomainQRelation } from './qdomain';
import { ApplicationVersionGraph, ApplicationVersionESelect, QApplicationVersion } from './qapplicationversion';
import { ApplicationCurrentVersionGraph, ApplicationCurrentVersionESelect, QApplicationCurrentVersion } from './qapplicationcurrentversion';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationESelect extends IEntitySelectProperties, ApplicationEOptionalId {
    GUID?: string | IQStringField;
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
    GUID?: string | IQStringField;
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
    GUID?: string | IQStringField;
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
    GUID?: string | IQStringField;
    SCOPE?: string | IQStringField;
    APPLICATION_NAME?: string | IQStringField;
    FULL_APPLICATION_NAME?: string | IQStringField;
    STATUS?: string | IQStringField;
    SIGNATURE?: string | IQStringField;
    DOMAIN_LID?: number | IQNumberField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplication<IQE extends QApplication = any> extends IQEntity<IQE | QApplication> {
    index: IQNumberField;
    GUID: IQStringField;
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