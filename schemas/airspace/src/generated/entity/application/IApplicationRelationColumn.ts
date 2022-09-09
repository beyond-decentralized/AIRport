import {
	IVersionedApplicationObject,
} from './IVersionedApplicationObject';
import {
	IApplicationColumn,
} from './IApplicationColumn';
import {
	IApplicationRelation,
} from './IApplicationRelation';



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


