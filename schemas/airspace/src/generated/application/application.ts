import {
	JsonApplicationWithLastIds,
} from '@airport/security-check';
import {
	IDomain,
} from './domain';
import {
	IApplicationVersion,
} from './applicationversion';
import {
	IApplicationCurrentVersion,
} from './applicationcurrentversion';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplication {
	
	// Id Properties
	index: number;

	// Id Relations

	// Non-Id Properties
	scope?: string;
	name?: string;
	packageName?: string;
	status?: string;
	signature?: string;
	jsonApplication?: JsonApplicationWithLastIds;

	// Non-Id Relations
	domain?: IDomain;
	versions?: IApplicationVersion[];
	currentVersion?: IApplicationCurrentVersion[];

	// Transient Properties

	// Public Methods
	
}


