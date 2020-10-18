import {
	IVersionedSchemaObject,
} from './versionedschemaobject';
import {
	TableConfiguration,
} from '@airport/air-control';
import {
	SchemaColumn,
} from '../../ddl/schema/SchemaColumn';
import {
	SchemaProperty,
} from '../../ddl/schema/SchemaProperty';
import {
	ISchemaVersion,
} from './schemaversion';
import {
	ISchemaColumn,
} from './schemacolumn';
import {
	ISchemaOperation,
} from './schemaoperation';
import {
	ISchemaProperty,
} from './schemaproperty';
import {
	ISchemaRelation,
} from './schemarelation';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaEntity extends IVersionedSchemaObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	isLocal?: boolean;
	isRepositoryEntity?: boolean;
	name?: string;
	tableConfig?: TableConfiguration;

	// Non-Id Relations
	schemaVersion?: ISchemaVersion;
	columns?: ISchemaColumn[];
	operations?: ISchemaOperation[];
	properties?: ISchemaProperty[];
	relations?: ISchemaRelation[];
	relationReferences?: ISchemaRelation[];

	// Transient Properties
	columnMap?: I{ [name: string]: SchemaColumn; };
	idColumns?: ISchemaColumn[];
	idColumnMap?: I{ [name: string]: SchemaColumn; };
	propertyMap?: I{ [name: string]: SchemaProperty; };

	// Public Methods
	
}


