import {
	ISynchronizationConflict,
} from './synchronizationconflict';
import {
	IActor,
} from '@airport/holding-pattern';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISynchronizationConflictPendingNotification {
	
	// Id Properties

	// Id Relations
	synchronizationConflict: ISynchronizationConflict;
	actor: IActor;

	// Non-Id Properties
	acknowledged?: boolean;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}


