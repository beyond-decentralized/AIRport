import {
	IVersionedSchemaObject,
} from './versionedschemaobject';
import {
	TableConfiguration,
} from '@airport/air-control';
import {
	ISchemaColumn,
} from './schemacolumn';
import {
	ISchemaProperty,
} from './schemaproperty';
import {
	ISchemaVersion,
} from './schemaversion';
import {
	ISchemaOperation,
} from './schemaoperation';
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
	columnMap?: { [name: string]: ISchemaColumn; };
	idColumns?: ISchemaColumn[];
	idColumnMap?: { [name: string]: ISchemaColumn; };
	propertyMap?: { [name: string]: ISchemaProperty; };

	// Public Methods
	
}


