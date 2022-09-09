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
} from './VVersionedApplicationObject';
import {
	Operation_Rule,
} from '@airport/ground-control';
import {
	ApplicationEntityVDescriptor,
} from './VApplicationEntity';
import {
	ApplicationEntity,
} from '../../../ddl/application/ApplicationEntity';
import {
	IApplicationOperation,
} from '../../entity/application/IApplicationOperation';



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

