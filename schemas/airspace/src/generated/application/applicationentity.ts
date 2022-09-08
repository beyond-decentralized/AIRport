import {
	IVersionedApplicationObject,
} from './VersionedApplicationObject';
import {
	ApplicationEntity_TableConfiguration,
} from '@airport/tarmaq-entity';
import {
	IApplicationColumn,
} from './applicationcolumn';
import {
	IApplicationVersion,
} from './ApplicationVersion';
import {
	IApplicationColumn,
} from './ApplicationColumn';
import {
	IApplicationOperation,
} from './ApplicationOperation';
import {
	IApplicationProperty,
} from './ApplicationProperty';
import {
	IApplicationRelation,
} from './ApplicationRelation';



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


