import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	VersionedApplicationObjectVDescriptor,
} from './vVersionedApplicationObject';
import {
	Operation_Rule,
} from '@airport/ground-control';
import {
	ApplicationEntityVDescriptor,
} from './vApplicationEntity';
import {
	ApplicationEntity,
} from '../../ddl/application/ApplicationEntity';
import {
	IApplicationOperation,
} from './ApplicationOperation';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationOperationVDescriptor<T>
    extends VersionedApplicationObjectVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	type?: number | IVNumberField;
	name?: string | IVStringField;
	rule?: Operation_Rule | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityVDescriptor<ApplicationEntity>

}


