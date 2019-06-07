import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
export interface ISequenceConsumer {
    createTimestamp?: number;
    randomNumber?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceConsumerESelect extends IEntitySelectProperties, SequenceConsumerEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceConsumerEId extends IEntityIdProperties {
    createTimestamp: number | IQNumberField;
    randomNumber: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceConsumerEOptionalId {
    createTimestamp?: number | IQNumberField;
    randomNumber?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceConsumerEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceConsumerEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SequenceConsumerECreateProperties extends Partial<SequenceConsumerEId>, SequenceConsumerEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SequenceConsumerECreateColumns extends SequenceConsumerEId, SequenceConsumerEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSequenceConsumer extends IQEntity {
    createTimestamp: IQNumberField;
    randomNumber: IQNumberField;
}
export interface QSequenceConsumerQId {
    createTimestamp: IQNumberField;
    randomNumber: IQNumberField;
}
export interface QSequenceConsumerQRelation extends IQRelation<QSequenceConsumer>, QSequenceConsumerQId {
}
