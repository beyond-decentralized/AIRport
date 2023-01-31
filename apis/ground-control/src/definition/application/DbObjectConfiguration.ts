import { DbIndexConfiguration } from "./DbIndexConfiguration";

export interface DbObjectConfiguration<DIC extends DbIndexConfiguration> {
	// SQL table name
	name: string;
	indexes?: DbPropertyIndexConfiguration | DIC[];
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

export interface DbPropertyIndexConfiguration {
	(entity): DbAPropertyIndexConfiguration[]
}

export interface DbAPropertyIndexConfiguration {
	property: any,
	unique?: boolean
}

export interface JsonDatabaseObjectConfiguration<DIC extends DbIndexConfiguration> {
	name: string
	columnIndexes?: DIC
	propertyIndexes?: JsonAPropertyIndexConfiguration[]
}

export interface JsonAPropertyIndexConfiguration {
	propertyIndex: number
	unique?: boolean
}