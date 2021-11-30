import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { SchemaGraph, SchemaESelect, QSchema } from './qschema';
import { Schema } from '../../ddl/schema/Schema';
import { Domain } from '../../ddl/schema/Domain';
/**
 * SELECT - All fields and relations (optional).
 */
export interface DomainESelect extends IEntitySelectProperties, DomainEOptionalId {
    name?: string | IQStringField;
    schemas?: SchemaESelect;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DomainGraph extends DomainEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    schemas?: SchemaGraph[];
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
export interface QDomain extends IQEntity<Domain> {
    id: IQNumberField;
    name: IQStringField;
    schemas: IQOneToManyRelation<Schema, QSchema>;
}
export interface QDomainQId {
    id: IQNumberField;
}
export interface QDomainQRelation extends IQRelation<Domain, QDomain>, QDomainQId {
}
//# sourceMappingURL=qdomain.d.ts.map