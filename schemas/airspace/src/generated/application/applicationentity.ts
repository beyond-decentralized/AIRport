import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';
import {
	TableConfiguration,
} from '@airport/air-traffic-control';
import {
	IApplicationColumn,
} from './applicationcolumn';
import {
	IApplicationVersion,
} from './applicationversion';
import {
	IApplicationOperation,
} from './applicationoperation';
import {
	IApplicationProperty,
} from './applicationproperty';
import {
	IApplicationRelation,
} from './applicationrelation';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplicationEntity extends IVersionedApplicationObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	isLocal?: boolean;
	isAirEntity?: boolean;
	name?: string;
	tableConfig?: TableConfiguration;

	// Non-Id Relations
	applicationVersion?: IApplicationVersion;
	columns?: IApplicationColumn[];
	operations?: IApplicationOperation[];
	properties?: IApplicationProperty[];
	relations?: IApplicationRelation[];
	relationReferences?: IApplicationRelation[];

	// Transient Properties
	columnMap?: { [name: string]: IApplicationColumn; };
	idColumns?: IApplicationColumn[];
	idColumnMap?: { [name: string]: IApplicationColumn; };
	propertyMap?: { [name: string]: IApplicationProperty; };

	// Public Methods
	
}


