export enum QueryResultType {
	// Ordered query result with bridging for all MtOs and OtM
	ENTITY_GRAPH,
	// Ordered query result, with objects grouped hierarchically by entity
	ENTITY_TREE,
	// Ordered query result, with objects grouped hierarchically by mapping
	TREE,
	// Flat array query result, with no forced ordering or grouping
	SHEET,
	// A single field query result, with no forced ordering or grouping
	FIELD,
	// Raw result, returned by a SQL string query
	RAW,
	// ENTITY_GRAPH with all arrays returned as a MappedEntityArray
	MAPPED_ENTITY_GRAPH,
	// ENTITY_TREE with all arrays returned as a MappedEntityArray
	MAPPED_ENTITY_TREE,
}