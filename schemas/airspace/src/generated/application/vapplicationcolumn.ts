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
	ApplicationEntityVDescriptor,
} from './vapplicationentity';
import {
	ApplicationEntity,
} from '../../ddl/application/ApplicationEntity';
import {
	ApplicationPropertyColumnVDescriptor,
} from './vapplicationpropertycolumn';
import {
	ApplicationPropertyColumn,
} from '../../ddl/application/ApplicationPropertyColumn';
import {
	ApplicationRelationColumnVDescriptor,
} from './vapplicationrelationcolumn';
import {
	ApplicationRelationColumn,
} from '../../ddl/application/ApplicationRelationColumn';
import {
	IApplicationColumn,
} from './applicationcolumn';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationColumnVDescriptor<T>
    extends VersionedApplicationObjectVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
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
	entity?: ApplicationEntityVDescriptor<ApplicationEntity>
	propertyColumns?: ApplicationPropertyColumnVDescriptor<ApplicationPropertyColumn>
	manyRelationColumns?: ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>
	oneRelationColumns?: ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>

}


