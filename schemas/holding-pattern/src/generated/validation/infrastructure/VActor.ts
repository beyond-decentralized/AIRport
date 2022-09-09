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
} from '@airport/travel-document-checkpoint';
import {
	ApplicationVDescriptor,
	Application,
} from '@airport/airspace';
import {
	IActor,
} from '../../entity/infrastructure/IActor';



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


