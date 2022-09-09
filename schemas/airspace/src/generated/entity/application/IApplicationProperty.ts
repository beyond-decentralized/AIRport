import {
	IVersionedApplicationObject,
} from './IVersionedApplicationObject';
import {
	IApplicationEntity,
} from './IApplicationEntity';
import {
	IApplicationPropertyColumn,
} from './IApplicationPropertyColumn';
import {
	IApplicationRelation,
} from './IApplicationRelation';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationProperty extends IVersionedApplicationObject {
	
	// Id Properties
	_localId: number;

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


