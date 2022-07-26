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
	ApplicationRelationColumnVDescriptor,
} from './vapplicationrelationcolumn';
import {
	IApplicationRelationColumn,
} from './applicationrelationcolumn';
import {
	IApplicationColumn,
} from './applicationcolumn';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationColumnVDescriptor
    extends VersionedApplicationObjectVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	index?: number | IVNumberField;
	idIndex?: number | IVNumberField;
	isGenerated?: boolean | IVBooleanField;
	allocationSize?: number | IVNumberField;
	name?: string | IVStringField;
	notNull?: boolean | IVBooleanField;
	precision?: number | IVNumberField;
	scale?: number | IVNumberField;
	type?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityVDescriptor;
	propertyColumns?: ApplicationPropertyColumnVDescriptor;
	manyRelationColumns?: ApplicationRelationColumnVDescriptor;
	oneRelationColumns?: ApplicationRelationColumnVDescriptor;

}


