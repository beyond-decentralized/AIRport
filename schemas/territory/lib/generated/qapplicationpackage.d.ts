import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { ApplicationEOptionalId, ApplicationESelect, QApplicationQRelation } from './qapplication';
import { PackageEOptionalId, PackageESelect, QPackageQRelation } from './qpackage';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationPackageESelect extends IEntitySelectProperties, ApplicationPackageEOptionalId {
    application?: ApplicationESelect;
    package?: PackageESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationPackageEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationPackageEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationPackageEUpdateProperties extends IEntityUpdateProperties {
    application?: ApplicationEOptionalId;
    package?: PackageEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationPackageECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationPackageEUpdateColumns extends IEntityUpdateColumns {
    APPLICATION_ID?: number | IQNumberField;
    PACKAGE_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationPackageECreateProperties extends Partial<ApplicationPackageEId>, ApplicationPackageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationPackageECreateColumns extends ApplicationPackageEId, ApplicationPackageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationPackage extends IQEntity {
    id: IQNumberField;
    application: QApplicationQRelation;
    package: QPackageQRelation;
}
export interface QApplicationPackageQId {
    id: IQNumberField;
}
export interface QApplicationPackageQRelation extends IQRelation<QApplicationPackage>, QApplicationPackageQId {
}
