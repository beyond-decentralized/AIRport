import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	UserAccountVDescriptor,
	UserAccount,
	TerminalVDescriptor,
	Terminal,
} from '@airport/travel-document-checkpoint/dist/app/bundle';
import {
	ApplicationVDescriptor,
	Application,
} from '@airport/airspace/dist/app/bundle';
import {
	IActor,
} from './Actor';



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

}


