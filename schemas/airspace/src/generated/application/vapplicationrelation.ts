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
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/tarmaq-entity';
import {
	ApplicationPropertyVDescriptor,
} from './vapplicationproperty';
import {
	ApplicationProperty,
} from '../../ddl/application/applicationproperty';
import {
	ApplicationEntityVDescriptor,
} from './vapplicationentity';
import {
	ApplicationEntity,
} from '../../ddl/application/applicationentity';
import {
	ApplicationRelationColumnVDescriptor,
} from './vapplicationrelationcolumn';
import {
	ApplicationRelationColumn,
} from '../../ddl/application/applicationrelationcolumn';
import {
	IApplicationRelation,
} from './applicationrelation';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationRelationVDescriptor<T>
    extends VersionedApplicationObjectVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	index?: number | IVNumberField;
	foreignKey?: ForeignKey | IVStringField;
	manyToOneElems?: ManyToOneElements | IVStringField;
	oneToManyElems?: OneToManyElements | IVStringField;
	relationType?: string | IVStringField;
	isId?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	property?: ApplicationPropertyVDescriptor<ApplicationProperty>
	entity?: ApplicationEntityVDescriptor<ApplicationEntity>
	relationEntity?: ApplicationEntityVDescriptor<ApplicationEntity>
	manyRelationColumns?: ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>
	oneRelationColumns?: ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>

}


