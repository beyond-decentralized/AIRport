import {
	IVersionedSchemaObject,
} from './versionedschemaobject';
import {
	ISchemaColumn,
} from './schemacolumn';
import {
	ISchemaProperty,
} from './schemaproperty';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaPropertyColumn extends IVersionedSchemaObject {
	
	// Id Properties

	// Id Relations
	column: ISchemaColumn;
	property: ISchemaProperty;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


