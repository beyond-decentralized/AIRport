import {
	ISchemaVersion,
	ISchemaEntity,
	ISchemaColumn,
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
	id: number;

	// Id Relations

	// Non-Id Properties
	actorRecordId?: number;
	updatedValue?: any;

	// Non-Id Relations
	schemaVersion?: ISchemaVersion;
	entity?: ISchemaEntity;
	repository?: IRepository;
	actor?: IActor;
	column?: ISchemaColumn;

	// Transient Properties

	// Public Methods
	
}


