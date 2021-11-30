import {
	IVersionedSchemaObject,
} from './versionedschemaobject';
import {
	ISchemaEntity,
} from './schemaentity';
import {
	ISchemaPropertyColumn,
} from './schemapropertycolumn';
import {
	ISchemaRelation,
} from './schemarelation';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaProperty extends IVersionedSchemaObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	name?: string;
	isId?: boolean;

	// Non-Id Relations
	entity?: ISchemaEntity;
	propertyColumns?: ISchemaPropertyColumn[];
	relation?: ISchemaRelation[];

	// Transient Properties

	// Public Methods
	
}


