import {
	IEntitySelectProperties,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ISystemWideOperationId,
} from './systemwideoperationid';



////////////////////
//  API INTERFACE //
////////////////////

export interface SystemWideOperationIdVDescriptor
    extends IEntitySelectProperties, SystemWideOperationIdEOptionalId {
	// Id Propertie
	_localId: number | IVNumberField;
	
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}


