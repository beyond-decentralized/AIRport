import {
	IDomain,
} from './Domain';
import {
	IApplicationVersion,
} from './ApplicationVersion';
import {
	IApplicationCurrentVersion,
} from './ApplicationCurrentVersion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplication {
	
	// Id Properties
	index: number;

	// Id Relations

	// Non-Id Properties
	GUID?: string;
	scope?: string;
	name?: string;
	fullName?: string;
	status?: string;
	signature?: string;

	// Non-Id Relations
	domain?: IDomain;
	versions?: IApplicationVersion[];
	currentVersion?: IApplicationCurrentVersion[];

	// Transient Properties

	// Public Methods
	
}


