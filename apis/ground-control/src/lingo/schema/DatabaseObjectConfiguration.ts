import {DatabaseIndexConfiguration} from "./DatabaseIndexConfiguration";

export interface DatabaseObjectConfiguration<DIC extends DatabaseIndexConfiguration> {
	// SQL table name
	name: string;
	indexes?: DatabaseIndexConfiguration[];
	schema?: string;
	// Non-JPA: overrides the auto-generated primary key. Useful for
	// specifying a custom order of the primary key
	// accepts column names or expressions with ASC | DESC
	primaryKey?: string[];
}