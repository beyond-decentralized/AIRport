import {
	IApplicationVersion,
	IApplicationEntity,
} from '@airport/traffic-pattern';
import {
	IRepository,
	IActor,
} from '@airport/holding-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IMissingRecord {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	actorRecordId?: number;
	status?: string;

	// Non-Id Relations
	applicationVersion?: IApplicationVersion;
	entity?: IApplicationEntity;
	repository?: IRepository;
	actor?: IActor;

	// Transient Properties

	// Public Methods
	
}


