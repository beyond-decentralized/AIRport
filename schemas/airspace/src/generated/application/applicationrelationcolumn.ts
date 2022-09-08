import {
	IVersionedApplicationObject,
} from './VersionedApplicationObject';
import {
	IApplicationColumn,
} from './ApplicationColumn';
import {
	IApplicationRelation,
} from './ApplicationRelation';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationRelationColumn extends IVersionedApplicationObject {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	manyColumn?: IApplicationColumn;
	oneColumn?: IApplicationColumn;
	manyRelation?: IApplicationRelation;
	oneRelation?: IApplicationRelation;
	parentRelation?: IApplicationRelation;

	// Transient Properties

	// Public Methods
	
}


