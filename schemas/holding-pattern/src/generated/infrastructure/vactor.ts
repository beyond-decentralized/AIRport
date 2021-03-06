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
	UserAccount,
	TerminalVDescriptor,
	Terminal,
	ClientVDescriptor,
	Client,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	ApplicationVDescriptor,
	Application,
} from '@airport/airspace';
import {
	IActor,
} from './actor';



////////////////////
//  API INTERFACE //
////////////////////

export interface ActorVDescriptor<T>
	extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;

	// Non-Id Properties
	GUID?: string | IVStringField;

	// Id Relations - full property interfaces

	// Non-Id relations (including OneToMany's)
	userAccount?: UserAccountVDescriptor<UserAccount>
	terminal?: TerminalVDescriptor<Terminal>
	application?: ApplicationVDescriptor<Application>
	client?: ClientVDescriptor<Client>

}


