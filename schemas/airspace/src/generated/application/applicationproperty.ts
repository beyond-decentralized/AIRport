import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	IApplicationPropertyColumn,
} from './applicationpropertycolumn';
import {
	IApplicationRelation,
} from './applicationrelation';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationProperty extends IVersionedApplicationObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	name?: string;
	isId?: boolean;

	// Non-Id Relations
	entity?: IApplicationEntity;
	propertyColumns?: IApplicationPropertyColumn[];
	relation?: IApplicationRelation[];

	// Transient Properties

	// Public Methods
	
}


