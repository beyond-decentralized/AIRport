import { DatabaseIndexConfiguration } from "./DatabaseIndexConfiguration";

export interface DatabaseObjectConfiguration<DIC extends DatabaseIndexConfiguration> {
	// SQL Schema name
	schema: string;
	// SQL table name
	name: string;
	indexes?: PropertyIndexConfiguration | DIC[];
	// application?: string;
	// Non-JPA: overrides the auto-generated primary key. Useful for
	// specifying a custom order of the primary key
	// accepts column names or expressions with ASC | DESC
	// primaryKey?: string[];
}

export interface IntermediatePropertyIndexConfiguration {
	body: {
		property: string,
		unique: boolean
	}[],
	parameters: {
		name: string
		type: string
	}[]
}

export interface PropertyIndexConfiguration {
	(entity): APropertyIndexConfiguration[]
}

export interface APropertyIndexConfiguration {
	property: any,
	unique?: boolean
}

export interface JsonDatabaseObjectConfiguration<DIC extends DatabaseIndexConfiguration> {
	name: string
	columnIndexes?: DIC
	propertyIndexes?: AJsonPropertyIndexConfiguration[]
}

export interface AJsonPropertyIndexConfiguration {
	propertyIndex: number
	unique?: boolean
}