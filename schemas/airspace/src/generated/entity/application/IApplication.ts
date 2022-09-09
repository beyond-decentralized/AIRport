import {
	IDomain,
} from './IDomain';
import {
	IApplicationVersion,
} from './IApplicationVersion';
import {
	IApplicationCurrentVersion,
} from './IApplicationCurrentVersion';



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


