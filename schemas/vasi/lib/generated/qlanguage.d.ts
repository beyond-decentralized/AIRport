import { IQDateField, IQNumberField, IQStringField } from '@airport/air-control';
import { SystemGeneratedGraph, SystemGeneratedEId, SystemGeneratedEUpdateColumns, SystemGeneratedEUpdateProperties, SystemGeneratedESelect, QSystemGeneratedQId, QSystemGeneratedQRelation, QSystemGenerated } from './attributes/qsystemgenerated';
import { Language } from '../ddl/Language';
/**
 * SELECT - All fields and relations (optional).
 */
export interface LanguageESelect extends SystemGeneratedESelect, LanguageEOptionalId {
    name?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LanguageEId extends SystemGeneratedEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface LanguageEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LanguageEUpdateProperties extends SystemGeneratedEUpdateProperties {
    name?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface LanguageGraph extends LanguageEOptionalId, SystemGeneratedGraph {
    name?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LanguageEUpdateColumns extends SystemGeneratedEUpdateColumns {
    CREATED_AT?: Date | IQDateField;
    LANGUAGE_NAME?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LanguageECreateProperties extends Partial<LanguageEId>, LanguageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LanguageECreateColumns extends LanguageEId, LanguageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLanguage extends QSystemGenerated<Language> {
    id: IQNumberField;
    name: IQStringField;
}
export interface QLanguageQId extends QSystemGeneratedQId {
    id: IQNumberField;
}
export interface QLanguageQRelation extends QSystemGeneratedQRelation<Language, QLanguage>, QLanguageQId {
}
//# sourceMappingURL=qlanguage.d.ts.map