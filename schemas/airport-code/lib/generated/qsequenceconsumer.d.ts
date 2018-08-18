import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IDomain, DomainEOptionalId, DomainESelect, QDomainQRelation } from '@airport/territory';
export interface ISequenceConsumer {
    id?: number;
    createTimestamp?: number;
    randomNumber?: number;
    domain?: IDomain;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceConsumerESelect extends IEntitySelectProperties, SequenceConsumerEOptionalId, SequenceConsumerEUpdateProperties {
    domain?: DomainESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceConsumerEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SequenceConsumerEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceConsumerEUpdateProperties extends IEntityUpdateProperties {
    createTimestamp?: number | IQNumberField;
    randomNumber?: number | IQNumberField;
    domain?: DomainEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceConsumerEUpdateColumns extends IEntityUpdateColumns {
    CREATE_TIMESTAMP?: number | IQNumberField;
    RANDOM_NUMBER?: number | IQNumberField;
    DOMAIN_ID?: number | IQNumberField;
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
export interface QSequenceConsumer extends QEntity {
    id: IQNumberField;
    createTimestamp: IQNumberField;
    randomNumber: IQNumberField;
    domain: QDomainQRelation;
}
export interface QSequenceConsumerQId {
    id: IQNumberField;
}
export interface QSequenceConsumerQRelation extends QRelation<QSequenceConsumer>, QSequenceConsumerQId {
}
