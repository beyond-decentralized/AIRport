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
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/tarmaq-entity';
import {
	ApplicationPropertyVDescriptor,
} from './vapplicationproperty';
import {
	IApplicationProperty,
} from './applicationproperty';
import {
	ApplicationEntityVDescriptor,
} from './vapplicationentity';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	ApplicationRelationColumnVDescriptor,
} from './vapplicationrelationcolumn';
import {
	IApplicationRelationColumn,
} from './applicationrelationcolumn';
import {
	IApplicationRelation,
} from './applicationrelation';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationRelationVDescriptor
    extends VersionedApplicationObjectVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	index?: number | IVNumberField;
	foreignKey?: ForeignKey | IVStringField;
	manyToOneElems?: ManyToOneElements | IVStringField;
	oneToManyElems?: OneToManyElements | IVStringField;
	relationType?: string | IVStringField;
	isId?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	property?: ApplicationPropertyVDescriptor;
	entity?: ApplicationEntityVDescriptor;
	relationEntity?: ApplicationEntityVDescriptor;
	manyRelationColumns?: ApplicationRelationColumnVDescriptor;
	oneRelationColumns?: ApplicationRelationColumnVDescriptor;

}


