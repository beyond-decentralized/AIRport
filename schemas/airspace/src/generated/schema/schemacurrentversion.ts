import {
	ISchema,
} from './schema';
import {
	ISchemaVersion,
} from './schemaversion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaCurrentVersion {
	
	// Id Properties

	// Id Relations
	schema: ISchema;
	schemaVersion: ISchemaVersion;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


