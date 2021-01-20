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
	ISchemaRelationColumn,
} from './schemarelationcolumn';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaColumn extends IVersionedSchemaObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	idIndex?: number;
	isGenerated?: boolean;
	allocationSize?: number;
	name?: string;
	notNull?: boolean;
	precision?: number;
	scale?: number;
	type?: number;

	// Non-Id Relations
	entity?: ISchemaEntity;
	propertyColumns?: ISchemaPropertyColumn[];
	manyRelationColumns?: ISchemaRelationColumn[];
	oneRelationColumns?: ISchemaRelationColumn[];

	// Transient Properties

	// Public Methods
	
}


