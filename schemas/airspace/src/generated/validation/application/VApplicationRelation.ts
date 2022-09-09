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
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/tarmaq-entity';
import {
	ApplicationPropertyVDescriptor,
} from './VApplicationProperty';
import {
	ApplicationProperty,
} from '../../../ddl/application/ApplicationProperty';
import {
	ApplicationEntityVDescriptor,
} from './VApplicationEntity';
import {
	ApplicationEntity,
} from '../../../ddl/application/ApplicationEntity';
import {
	ApplicationRelationColumnVDescriptor,
} from './VApplicationRelationColumn';
import {
	ApplicationRelationColumn,
} from '../../../ddl/application/ApplicationRelationColumn';
import {
	IApplicationRelation,
} from '../../entity/application/IApplicationRelation';



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


