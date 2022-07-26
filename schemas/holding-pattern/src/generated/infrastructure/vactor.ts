import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	UserAccountVDescriptor,
	IUserAccount,
	TerminalVDescriptor,
	ITerminal,
	ClientVDescriptor,
	IClient,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	ApplicationVDescriptor,
	IApplication,
} from '@airport/airspace';
import {
	IActor,
} from './actor';



////////////////////
//  API INTERFACE //
////////////////////

export interface ActorVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	GUID?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	userAccount?: UserAccountVDescriptor;
	terminal?: TerminalVDescriptor;
	application?: ApplicationVDescriptor;
	client?: ClientVDescriptor;

}


