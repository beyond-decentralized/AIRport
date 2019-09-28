import {
	ISchemaVersion,
} from './schemaversion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IVersionedSchemaObject {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	deprecatedSinceVersion?: ISchemaVersion;
	removedInVersion?: ISchemaVersion;
	sinceVersion?: ISchemaVersion;

	// Transient Properties

	// Public Methods
	
}


