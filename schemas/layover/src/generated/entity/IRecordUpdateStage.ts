import {
	IApplicationVersion,
	IApplicationEntity,
	IApplicationColumn,
} from '@airport/airspace';
import {
	IRepository,
	IActor,
} from '@airport/holding-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRecordUpdateStage {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	_actorRecordId?: number;
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


