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
	IApplicationRelationColumn,
} from './IApplicationRelationColumn';



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


