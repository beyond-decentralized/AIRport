import {
	IVersionedApplicationObject,
} from './IVersionedApplicationObject';
import {
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/tarmaq-entity';
import {
	IApplicationProperty,
} from './IApplicationProperty';
import {
	IApplicationEntity,
} from './IApplicationEntity';
import {
	IApplicationRelationColumn,
} from './IApplicationRelationColumn';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationRelation extends IVersionedApplicationObject {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	foreignKey?: ForeignKey;
	manyToOneElems?: ManyToOneElements;
	oneToManyElems?: OneToManyElements;
	relationType?: string;
	isId?: boolean;

	// Non-Id Relations
	property?: IApplicationProperty;
	entity?: IApplicationEntity;
	relationEntity?: IApplicationEntity;
	manyRelationColumns?: IApplicationRelationColumn[];
	oneRelationColumns?: IApplicationRelationColumn[];

	// Transient Properties

	// Public Methods
	
}


