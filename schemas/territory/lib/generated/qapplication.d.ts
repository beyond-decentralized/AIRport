import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { IDomain, DomainEOptionalId, DomainESelect, QDomainQRelation } from './qdomain';
import { IApplicationPackage, ApplicationPackageECascadeGraph, ApplicationPackageESelect, QApplicationPackage } from './qapplicationpackage';
export interface IApplication {
    id: number;
    name?: string;
    domain?: IDomain;
    applicationPackages?: IApplicationPackage[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationESelect extends IEntitySelectProperties, ApplicationEOptionalId {
    name?: string | IQStringField;
    domain?: DomainESelect;
    applicationPackages?: ApplicationPackageESelect;
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
    name?: string | IQStringField;
    domain?: DomainEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationECascadeGraph extends IEntityCascadeGraph {
    applicationPackages?: ApplicationPackageECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
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
    id: IQNumberField;
    name: IQStringField;
    domain: QDomainQRelation;
    applicationPackages: IQOneToManyRelation<QApplicationPackage>;
}
export interface QApplicationQId {
    id: IQNumberField;
}
export interface QApplicationQRelation extends IQRelation<QApplication>, QApplicationQId {
}
