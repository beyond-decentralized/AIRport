import {
	IVersionedSchemaObject,
} from './versionedschemaobject';
import {
	Operation_Rule,
} from '@airport/ground-control';
import {
	ISchemaEntity,
} from './schemaentity';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaOperation extends IVersionedSchemaObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	type?: number;
	name?: string;
	rule?: Operation_Rule;

	// Non-Id Relations
	entity?: ISchemaEntity;

	// Transient Properties

	// Public Methods
	
}


