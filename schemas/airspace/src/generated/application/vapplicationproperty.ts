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
	ApplicationEntityVDescriptor,
} from './vapplicationentity';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	ApplicationPropertyColumnVDescriptor,
} from './vapplicationpropertycolumn';
import {
	IApplicationPropertyColumn,
} from './applicationpropertycolumn';
import {
	ApplicationRelationVDescriptor,
} from './vapplicationrelation';
import {
	IApplicationRelation,
} from './applicationrelation';
import {
	IApplicationProperty,
} from './applicationproperty';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationPropertyVDescriptor
    extends VersionedApplicationObjectVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	index?: number | IVNumberField;
	name?: string | IVStringField;
	isId?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityVDescriptor;
	propertyColumns?: ApplicationPropertyColumnVDescriptor;
	relation?: ApplicationRelationVDescriptor;

}


