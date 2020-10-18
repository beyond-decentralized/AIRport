import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { PackageGraph, PackageEOptionalId, PackageESelect, QPackageQRelation } from './qpackage';
/**
 * SELECT - All fields and relations (optional).
 */
export interface PackagedUnitESelect extends IEntitySelectProperties, PackagedUnitEOptionalId {
    name?: string | IQStringField;
    package?: PackageESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface PackagedUnitEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface PackagedUnitEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface PackagedUnitEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
    package?: PackageEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface PackagedUnitGraph extends IEntitySelectProperties, PackagedUnitEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    package?: PackageGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface PackagedUnitEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
    PACKAGE_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface PackagedUnitECreateProperties extends Partial<PackagedUnitEId>, PackagedUnitEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface PackagedUnitECreateColumns extends PackagedUnitEId, PackagedUnitEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QPackagedUnit extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
    package: QPackageQRelation;
}
export interface QPackagedUnitQId {
    id: IQNumberField;
}
export interface QPackagedUnitQRelation extends IQRelation<QPackagedUnit>, QPackagedUnitQId {
}
//# sourceMappingURL=qpackagedunit.d.ts.map