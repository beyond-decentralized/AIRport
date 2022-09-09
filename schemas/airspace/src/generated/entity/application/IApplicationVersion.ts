import {
	JsonApplicationWithLastIds,
} from '@airport/apron';
import {
	IApplication,
} from './IApplication';
import {
	IApplicationEntity,
} from './IApplicationEntity';
import {
	IApplicationReference,
} from './IApplicationReference';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationVersion {
	
	// Id Properties
	_localId: number;

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

