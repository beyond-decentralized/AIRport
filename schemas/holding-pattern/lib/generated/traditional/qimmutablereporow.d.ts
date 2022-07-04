import { IQDateField, IQEntity } from '@airport/air-traffic-control';
import { AirEntityGraph, AirEntityEId, AirEntityEUpdateColumns, AirEntityEUpdateProperties, AirEntityESelect, QAirEntityQId, QAirEntityQRelation, QAirEntity } from '../repository/qairentity';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableRepoRowESelect extends AirEntityESelect, ImmutableRepoRowEOptionalId {
    createdAt?: Date | IQDateField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableRepoRowEId extends AirEntityEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableRepoRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableRepoRowEUpdateProperties extends AirEntityEUpdateProperties {
    createdAt?: Date | IQDateField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ImmutableRepoRowGraph extends ImmutableRepoRowEOptionalId, AirEntityGraph {
    createdAt?: Date | IQDateField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableRepoRowEUpdateColumns extends AirEntityEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableRepoRowECreateProperties extends Partial<ImmutableRepoRowEId>, ImmutableRepoRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableRepoRowECreateColumns extends ImmutableRepoRowEId, ImmutableRepoRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QImmutableRepoRow extends QAirEntity {
    createdAt: IQDateField;
}
export interface QImmutableRepoRowQId extends QAirEntityQId {
}
export interface QImmutableRepoRowQRelation<SubType, SubQType extends IQEntity> extends QAirEntityQRelation<SubType, SubQType>, QImmutableRepoRowQId {
}
//# sourceMappingURL=qimmutablereporow.d.ts.map