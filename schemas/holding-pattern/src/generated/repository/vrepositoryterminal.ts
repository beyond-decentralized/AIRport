import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	RepositoryVDescriptor,
} from './vRepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	TerminalVDescriptor,
	Terminal,
} from '@airport/travel-document-checkpoint/dist/app/bundle';
import {
	IRepositoryTerminal,
} from './RepositoryTerminal';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryTerminalVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryVDescriptor<Repository>
	terminal?: TerminalVDescriptor<Terminal>

  // Non-Id relations (including OneToMany's)

}


