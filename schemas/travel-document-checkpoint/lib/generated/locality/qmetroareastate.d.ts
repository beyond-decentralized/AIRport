import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { StateGraph, StateEId, StateEOptionalId, StateESelect, QStateQId, QStateQRelation } from './qstate';
import { MetroAreaGraph, MetroAreaEId, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQId, QMetroAreaQRelation } from './qmetroarea';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MetroAreaStateESelect extends IEntitySelectProperties, MetroAreaStateEOptionalId {
    state?: StateESelect;
    metroArea?: MetroAreaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MetroAreaStateEId extends IEntityIdProperties {
    state: StateEId;
    metroArea: MetroAreaEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface MetroAreaStateEOptionalId {
    state?: StateEOptionalId;
    metroArea?: MetroAreaEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MetroAreaStateEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MetroAreaStateGraph extends MetroAreaStateEOptionalId, IEntityCascadeGraph {
    state?: StateGraph;
    metroArea?: MetroAreaGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MetroAreaStateEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MetroAreaStateECreateProperties extends Partial<MetroAreaStateEId>, MetroAreaStateEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MetroAreaStateECreateColumns extends MetroAreaStateEId, MetroAreaStateEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QMetroAreaState<IQE extends QMetroAreaState = any> extends IQEntity<IQE | QMetroAreaState> {
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
}
export interface QMetroAreaStateQId {
    state: QStateQId;
    metroArea: QMetroAreaQId;
}
export interface QMetroAreaStateQRelation extends IQRelation<QMetroAreaState>, QMetroAreaStateQId {
}
//# sourceMappingURL=qmetroareastate.d.ts.map