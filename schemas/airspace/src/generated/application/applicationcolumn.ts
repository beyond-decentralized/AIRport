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
	IApplicationRelationColumn,
} from './applicationrelationcolumn';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationColumn extends IVersionedApplicationObject {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	idIndex?: number;
	isGenerated?: boolean;
	allocationSize?: number;
	name?: string;
	notNull?: boolean;
	precision?: number;
	scale?: number;
	type?: string;

	// Non-Id Relations
	entity?: IApplicationEntity;
	propertyColumns?: IApplicationPropertyColumn[];
	manyRelationColumns?: IApplicationRelationColumn[];
	oneRelationColumns?: IApplicationRelationColumn[];

	// Transient Properties

	// Public Methods
	
}


