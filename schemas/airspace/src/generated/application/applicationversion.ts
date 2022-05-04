import {
	JsonApplicationWithLastIds,
} from '@airport/apron';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	IApplicationReference,
} from './applicationreference';
import {
	IApplication,
} from './application';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationVersion {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	integerVersion?: number;
	versionString?: string;
	majorVersion?: number;
	minorVersion?: number;
	patchVersion?: number;
	jsonApplication?: JsonApplicationWithLastIds;

	// Non-Id Relations
	application?: IApplication;
	entities?: IApplicationEntity[];
	references?: IApplicationReference[];
	referencedBy?: IApplicationReference[];

	// Transient Properties
	entityMapByName?: { [entityName: string]: IApplicationEntity; };
	referencesMapByName?: { [fullApplicationName: string]: IApplicationReference; };
	referencedByMapByName?: { [fullApplicationName: string]: IApplicationReference; };

	// Public Methods
	
}


