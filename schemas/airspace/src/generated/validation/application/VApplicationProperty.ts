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
	ApplicationEntityVDescriptor,
} from './VApplicationEntity';
import {
	ApplicationEntity,
} from '../../../ddl/application/ApplicationEntity';
import {
	ApplicationPropertyColumnVDescriptor,
} from './VApplicationPropertyColumn';
import {
	ApplicationPropertyColumn,
} from '../../../ddl/application/ApplicationPropertyColumn';
import {
	ApplicationRelationVDescriptor,
} from './VApplicationRelation';
import {
	ApplicationRelation,
} from '../../../ddl/application/ApplicationRelation';
import {
	IApplicationProperty,
} from '../../entity/application/IApplicationProperty';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationPropertyVDescriptor<T>
    extends VersionedApplicationObjectVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	index?: number | IVNumberField;
	name?: string | IVStringField;
	isId?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityVDescriptor<ApplicationEntity>
	propertyColumns?: ApplicationPropertyColumnVDescriptor<ApplicationPropertyColumn>
	relation?: ApplicationRelationVDescriptor<ApplicationRelation>

}


