import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { IApplication, ApplicationESelect, QApplication } from './qapplication';
export interface IDomain {
    id?: number;
    name?: string;
    applications?: IApplication[];
    schemas?: DbSchema[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface DomainESelect extends IEntitySelectProperties, DomainEOptionalId, DomainEUpdateProperties {
    applications?: ApplicationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DomainEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DomainEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DomainEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface DomainEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DomainECreateProperties extends Partial<DomainEId>, DomainEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DomainECreateColumns extends DomainEId, DomainEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDomain extends QEntity {
    id: IQNumberField;
    name: IQStringField;
    applications: IQOneToManyRelation<QApplication>;
}
export interface QDomainQId {
    id: IQNumberField;
}
export interface QDomainQRelation extends QRelation<QDomain>, QDomainQId {
}
