import {
	IVersionedSchemaObject,
} from './versionedschemaobject';
import {
	ISchemaVersion,
} from './schemaversion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaReference extends IVersionedSchemaObject {
	
	// Id Properties

	// Id Relations
	ownSchemaVersion: ISchemaVersion;
	referencedSchemaVersion: ISchemaVersion;

	// Non-Id Properties
	index?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


