import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ApplicationPackageGraph, ApplicationPackageESelect, QApplicationPackage } from './qapplicationpackage';
/**
 * SELECT - All fields and relations (optional).
 */
export interface PackageESelect extends IEntitySelectProperties, PackageEOptionalId {
    name?: string | IQStringField;
    applicationPackages?: ApplicationPackageESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface PackageEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface PackageEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface PackageEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface PackageGraph extends PackageEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    applicationPackages?: ApplicationPackageGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface PackageEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface PackageECreateProperties extends Partial<PackageEId>, PackageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface PackageECreateColumns extends PackageEId, PackageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QPackage extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
    applicationPackages: IQOneToManyRelation<QApplicationPackage>;
}
export interface QPackageQId {
    id: IQNumberField;
}
export interface QPackageQRelation extends IQRelation<QPackage>, QPackageQId {
}
//# sourceMappingURL=qpackage.d.ts.map