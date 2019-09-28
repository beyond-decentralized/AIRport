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
	properties?: ISchemaProperty[];
	relations?: ISchemaRelation[];
	relationReferences?: ISchemaRelation[];

	// Transient Properties
	columnMap?: { [name: string]: SchemaColumn; };
	idColumns?: SchemaColumn[];
	idColumnMap?: { [name: string]: SchemaColumn; };
	propertyMap?: { [name: string]: SchemaProperty; };

	// Public Methods
	
}


