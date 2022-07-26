import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	VersionedApplicationObjectVDescriptor,
} from './vversionedapplicationobject';
import {
	ApplicationColumnVDescriptor,
} from './vapplicationcolumn';
import {
	IApplicationColumn,
} from './applicationcolumn';
import {
	ApplicationRelationVDescriptor,
} from './vapplicationrelation';
import {
	IApplicationRelation,
} from './applicationrelation';
import {
	IApplicationRelationColumn,
} from './applicationrelationcolumn';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationRelationColumnVDescriptor
    extends VersionedApplicationObjectVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	manyColumn?: ApplicationColumnVDescriptor;
	oneColumn?: ApplicationColumnVDescriptor;
	manyRelation?: ApplicationRelationVDescriptor;
	oneRelation?: ApplicationRelationVDescriptor;
	parentRelation?: ApplicationRelationVDescriptor;

}


