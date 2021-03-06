import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';
import {
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/tarmaq-entity';
import {
	IApplicationProperty,
} from './applicationproperty';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	IApplicationRelationColumn,
} from './applicationrelationcolumn';



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


