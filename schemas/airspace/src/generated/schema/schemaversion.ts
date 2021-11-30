import {
	ISchemaEntity,
} from './schemaentity';
import {
	ISchemaReference,
} from './schemareference';
import {
	ISchema,
} from './schema';



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
	entityMapByName?: { [entityName: string]: ISchemaEntity; };
	referencesMapByName?: { [schemaName: string]: ISchemaReference; };
	referencedByMapByName?: { [schemaName: string]: ISchemaReference; };

	// Public Methods
	
}


