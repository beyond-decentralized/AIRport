import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';
import {
	IApplicationColumn,
} from './applicationcolumn';
import {
	IApplicationRelation,
} from './applicationrelation';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationRelationColumn extends IVersionedApplicationObject {
	
	// Id Properties
	id: number;

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


