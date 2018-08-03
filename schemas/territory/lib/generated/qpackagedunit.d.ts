import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { IPackage, PackageEOptionalId, PackageESelect, QPackageQRelation } from './qpackage';
export interface IPackagedUnit {
    id?: number;
    name?: string;
    package?: IPackage;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface PackagedUnitESelect extends IEntitySelectProperties, PackagedUnitEOptionalId, PackagedUnitEUpdateProperties {
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
export interface QPackagedUnit extends QEntity {
    id: IQNumberField;
    name: IQStringField;
    package: QPackageQRelation;
}
export interface QPackagedUnitQId {
    id: IQNumberField;
}
export interface QPackagedUnitQRelation extends QRelation<QPackagedUnit>, QPackagedUnitQId {
}
