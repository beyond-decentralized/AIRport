import { IQDateField, IQEntity } from '@airport/air-control';
import { IImmutableRepoRow, ImmutableRepoRowEId, ImmutableRepoRowEUpdateColumns, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowESelect, QImmutableRepoRowQId, QImmutableRepoRowQRelation, QImmutableRepoRow } from './qimmutablereporow';
export interface IMutableRepoRow extends IImmutableRepoRow {
    updatedAt?: Date;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface MutableRepoRowESelect extends ImmutableRepoRowESelect, MutableRepoRowEOptionalId {
    updatedAt?: Date | IQDateField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MutableRepoRowEId extends ImmutableRepoRowEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface MutableRepoRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MutableRepoRowEUpdateProperties extends ImmutableRepoRowEUpdateProperties {
    updatedAt?: Date | IQDateField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MutableRepoRowEUpdateColumns extends ImmutableRepoRowEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MutableRepoRowECreateProperties extends Partial<MutableRepoRowEId>, MutableRepoRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MutableRepoRowECreateColumns extends MutableRepoRowEId, MutableRepoRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMutableRepoRow extends QImmutableRepoRow {
    updatedAt: IQDateField;
}
export interface QMutableRepoRowQId extends QImmutableRepoRowQId {
}
export interface QMutableRepoRowQRelation<SubType extends IQEntity> extends QImmutableRepoRowQRelation<QMutableRepoRow>, QMutableRepoRowQId {
}
