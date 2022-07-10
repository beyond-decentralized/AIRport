import {
	IVersionedApplicationObject,
} from './versionedapplicationobject';
import {
	ApplicationEntity_TableConfiguration,
} from '@airport/tarmaq-entity';
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
	_localId: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	isLocal?: boolean;
	isAirEntity?: boolean;
	name?: string;
	tableConfig?: ApplicationEntity_TableConfiguration;

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


