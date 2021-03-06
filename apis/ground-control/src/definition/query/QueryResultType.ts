export enum QueryResultType {
	// Ordered query result with bridging for all MtOs and OtM
	ENTITY_GRAPH = 'ENTITY_GRAPH',
	// Ordered query result, with objects grouped hierarchically by entity
	ENTITY_TREE = 'ENTITY_TREE',
	// Ordered query result, with objects grouped hierarchically by mapping
	TREE = 'TREE',
	// Flat array query result, with no forced ordering or grouping
	SHEET = 'SHEET',
	// A single field query result, with no forced ordering or grouping
	FIELD = 'FIELD',
	// Raw result, returned by a SQL string query
	RAW = 'RAW',
}