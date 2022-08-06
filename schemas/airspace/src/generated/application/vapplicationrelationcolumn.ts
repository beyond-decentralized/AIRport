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
} from './vversionedapplicationobject';
import {
	ApplicationColumnVDescriptor,
} from './vapplicationcolumn';
import {
	ApplicationColumn,
} from '../../ddl/application/applicationcolumn';
import {
	ApplicationRelationVDescriptor,
} from './vapplicationrelation';
import {
	ApplicationRelation,
} from '../../ddl/application/applicationrelation';
import {
	IApplicationRelationColumn,
} from './applicationrelationcolumn';



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


