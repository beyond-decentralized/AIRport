import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	RepositoryVDescriptor,
} from './vrepository';
import {
	IRepository,
} from './repository';
import {
	TerminalVDescriptor,
	ITerminal,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	IRepositoryTerminal,
} from './repositoryterminal';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryTerminalVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor;
	terminal?: TerminalVDescriptor;

  // Non-Id relations (including OneToMany's)

}


