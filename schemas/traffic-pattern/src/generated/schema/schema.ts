import {
	IDomain,
} from '@airport/territory';
import {
	ISchemaVersion,
} from './schemaversion';



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
	status?: number;

	// Non-Id Relations
	domain?: IDomain;
	versions?: ISchemaVersion[];
	currentVersion?: ISchemaVersion;

	// Transient Properties

	// Public Methods
	
}


