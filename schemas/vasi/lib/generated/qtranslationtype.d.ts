import { IQDateField, IQNumberField, IQStringField } from '@airport/air-control';
import { SystemGeneratedGraph, SystemGeneratedEId, SystemGeneratedEUpdateColumns, SystemGeneratedEUpdateProperties, SystemGeneratedESelect, QSystemGeneratedQId, QSystemGeneratedQRelation, QSystemGenerated } from './attributes/qsystemgenerated';
import { TranslationType } from '../ddl/TranslationType';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TranslationTypeESelect extends SystemGeneratedESelect, TranslationTypeEOptionalId {
    code?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TranslationTypeEId extends SystemGeneratedEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TranslationTypeEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TranslationTypeEUpdateProperties extends SystemGeneratedEUpdateProperties {
    code?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TranslationTypeGraph extends TranslationTypeEOptionalId, SystemGeneratedGraph {
    code?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TranslationTypeEUpdateColumns extends SystemGeneratedEUpdateColumns {
    CREATED_AT?: Date | IQDateField;
    TRANSLATION_TYPE_CODE?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TranslationTypeECreateProperties extends Partial<TranslationTypeEId>, TranslationTypeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TranslationTypeECreateColumns extends TranslationTypeEId, TranslationTypeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTranslationType extends QSystemGenerated<TranslationType> {
    id: IQNumberField;
    code: IQStringField;
}
export interface QTranslationTypeQId extends QSystemGeneratedQId {
    id: IQNumberField;
}
export interface QTranslationTypeQRelation extends QSystemGeneratedQRelation<TranslationType, QTranslationType>, QTranslationTypeQId {
}
//# sourceMappingURL=qtranslationtype.d.ts.map