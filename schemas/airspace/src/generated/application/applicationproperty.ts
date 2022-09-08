import {
	IVersionedApplicationObject,
} from './VersionedApplicationObject';
import {
	IApplicationEntity,
} from './ApplicationEntity';
import {
	IApplicationPropertyColumn,
} from './ApplicationPropertyColumn';
import {
	IApplicationRelation,
} from './ApplicationRelation';



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


