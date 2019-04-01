import { IQEntityInternal } from '@airport/air-control';
import { IStageable, StageableEId, StageableEUpdateColumns, StageableEUpdateProperties, StageableESelect, QStageableQId, QStageableQRelation, QStageable } from '../infrastructure/qstageable';
export interface IChildRow extends IStageable {
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ChildRowESelect extends StageableESelect, ChildRowEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ChildRowEId extends StageableEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ChildRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ChildRowEUpdateProperties extends StageableEUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ChildRowEUpdateColumns extends StageableEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ChildRowECreateProperties extends Partial<ChildRowEId>, ChildRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ChildRowECreateColumns extends ChildRowEId, ChildRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QChildRow extends QStageable {
}
export interface QChildRowQId extends QStageableQId {
}
export interface QChildRowQRelation<SubType extends IQEntityInternal> extends QStageableQRelation<QChildRow>, QChildRowQId {
}
