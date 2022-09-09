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
	ApplicationColumnVDescriptor,
} from './VApplicationColumn';
import {
	ApplicationColumn,
} from '../../../ddl/application/ApplicationColumn';
import {
	ApplicationRelationVDescriptor,
} from './VApplicationRelation';
import {
	ApplicationRelation,
} from '../../../ddl/application/ApplicationRelation';
import {
	IApplicationRelationColumn,
} from '../../entity/application/IApplicationRelationColumn';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationRelationColumnVDescriptor<T>
    extends VersionedApplicationObjectVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	manyColumn?: ApplicationColumnVDescriptor<ApplicationColumn>
	oneColumn?: ApplicationColumnVDescriptor<ApplicationColumn>
	manyRelation?: ApplicationRelationVDescriptor<ApplicationRelation>
	oneRelation?: ApplicationRelationVDescriptor<ApplicationRelation>
	parentRelation?: ApplicationRelationVDescriptor<ApplicationRelation>

}


