import {
	IVersionedSchemaObject,
} from './versionedschemaobject';
import {
	ISchemaColumn,
} from './schemacolumn';
import {
	ISchemaRelation,
} from './schemarelation';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaRelationColumn extends IVersionedSchemaObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	manyColumn?: ISchemaColumn;
	oneColumn?: ISchemaColumn;
	manyRelation?: ISchemaRelation;
	oneRelation?: ISchemaRelation;
	parentRelation?: ISchemaRelation;

	// Transient Properties

	// Public Methods
	
}


