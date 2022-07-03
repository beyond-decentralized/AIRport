import {
	JsonApplicationWithLastIds,
} from '@airport/apron';
import {
	IApplication,
} from './application';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	IApplicationReference,
} from './applicationreference';



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
	referencesMapByName?: { [fullApplication_Name: string]: IApplicationReference; };
	referencedByMapByName?: { [fullApplication_Name: string]: IApplicationReference; };

	// Public Methods
	
}


