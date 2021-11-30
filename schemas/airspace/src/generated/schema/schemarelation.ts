import {
	IVersionedSchemaObject,
} from './versionedschemaobject';
import {
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/air-control';
import {
	ISchemaProperty,
} from './schemaproperty';
import {
	ISchemaEntity,
} from './schemaentity';
import {
	ISchemaRelationColumn,
} from './schemarelationcolumn';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaRelation extends IVersionedSchemaObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	foreignKey?: ForeignKey;
	manyToOneElems?: ManyToOneElements;
	oneToManyElems?: OneToManyElements;
	relationType?: string;
	isId?: boolean;

	// Non-Id Relations
	property?: ISchemaProperty;
	entity?: ISchemaEntity;
	relationEntity?: ISchemaEntity;
	manyRelationColumns?: ISchemaRelationColumn[];
	oneRelationColumns?: ISchemaRelationColumn[];

	// Transient Properties

	// Public Methods
	
}


