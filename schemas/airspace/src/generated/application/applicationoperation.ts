import {
	IVersionedApplicationObject,
} from './VersionedApplicationObject';
import {
	Operation_Rule,
} from '@airport/ground-control';
import {
	IApplicationEntity,
} from './ApplicationEntity';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationOperation extends IVersionedApplicationObject {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	type?: number;
	name?: string;
	rule?: Operation_Rule;

	// Non-Id Relations
	entity?: IApplicationEntity;

	// Transient Properties

	// Public Methods
	
}


