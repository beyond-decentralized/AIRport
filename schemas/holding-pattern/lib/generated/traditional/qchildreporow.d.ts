import { IQEntity } from '@airport/air-traffic-control';
import { AirEntityGraph, AirEntityEId, AirEntityEUpdateColumns, AirEntityEUpdateProperties, AirEntityESelect, QAirEntityQId, QAirEntityQRelation, QAirEntity } from '../repository/qairentity';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ChildRepoRowESelect extends AirEntityESelect, ChildRepoRowEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ChildRepoRowEId extends AirEntityEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ChildRepoRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ChildRepoRowEUpdateProperties extends AirEntityEUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ChildRepoRowGraph extends ChildRepoRowEOptionalId, AirEntityGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ChildRepoRowEUpdateColumns extends AirEntityEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ChildRepoRowECreateProperties extends Partial<ChildRepoRowEId>, ChildRepoRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ChildRepoRowECreateColumns extends ChildRepoRowEId, ChildRepoRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QChildRepoRow extends QAirEntity {
}
export interface QChildRepoRowQId extends QAirEntityQId {
}
export interface QChildRepoRowQRelation<SubType, SubQType extends IQEntity> extends QAirEntityQRelation<SubType, SubQType>, QChildRepoRowQId {
}
//# sourceMappingURL=qchildreporow.d.ts.map