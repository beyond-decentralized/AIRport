import {
	SchemaEntity,
} from '../../ddl/schema/SchemaEntity';
import {
	SchemaReference,
} from '../../ddl/schema/SchemaReference';
import {
	ISchema,
} from './schema';
import {
	ISchemaEntity,
} from './schemaentity';
import {
	ISchemaReference,
} from './schemareference';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaVersion {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	integerVersion?: number;
	versionString?: string;
	majorVersion?: number;
	minorVersion?: number;
	patchVersion?: number;

	// Non-Id Relations
	schema?: ISchema;
	entities?: ISchemaEntity[];
	references?: ISchemaReference[];
	referencedBy?: ISchemaReference[];

	// Transient Properties
	entityMapByName?: { [entityName: string]: SchemaEntity; };
	referencesMapByName?: { [schemaName: string]: SchemaReference; };
	referencedByMapByName?: { [schemaName: string]: SchemaReference; };

	// Public Methods
	
}

