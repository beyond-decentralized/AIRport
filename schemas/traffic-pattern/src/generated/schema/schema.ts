import {
	JsonSchemaWithLastIds,
} from '@airport/security-check';
import {
	IDomain,
} from './domain';
import {
	ISchemaVersion,
} from './schemaversion';
import {
	ISchemaCurrentVersion,
} from './schemacurrentversion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchema {
	
	// Id Properties
	index: number;

	// Id Relations

	// Non-Id Properties
	scope?: string;
	name?: string;
	packageName?: string;
	status?: string;
	signature?: string;
	jsonSchema?: JsonSchemaWithLastIds;

	// Non-Id Relations
	domain?: IDomain;
	versions?: ISchemaVersion[];
	currentVersion?: ISchemaCurrentVersion[];

	// Transient Properties

	// Public Methods
	
}


