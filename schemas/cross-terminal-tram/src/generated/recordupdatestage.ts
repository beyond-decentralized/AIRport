import {
	IApplicationVersion,
	IApplicationEntity,
	IApplicationColumn,
} from '@airport/traffic-pattern';
import {
	IRepository,
	IActor,
} from '@airport/holding-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRecordUpdateStage {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	actorRecordId?: number;
	updatedValue?: any;

	// Non-Id Relations
	applicationVersion?: IApplicationVersion;
	entity?: IApplicationEntity;
	repository?: IRepository;
	actor?: IActor;
	column?: IApplicationColumn;

	// Transient Properties

	// Public Methods
	
}


