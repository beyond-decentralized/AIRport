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
} from './vVersionedApplicationObject';
import {
	ApplicationEntity_TableConfiguration,
} from '@airport/tarmaq-entity';
import {
	ApplicationVersionVDescriptor,
} from './vApplicationVersion';
import {
	ApplicationVersion,
} from '../../ddl/application/ApplicationVersion';
import {
	ApplicationColumnVDescriptor,
} from './vApplicationColumn';
import {
	ApplicationColumn,
} from '../../ddl/application/ApplicationColumn';
import {
	ApplicationOperationVDescriptor,
} from './vApplicationOperation';
import {
	ApplicationOperation,
} from '../../ddl/application/ApplicationOperation';
import {
	ApplicationPropertyVDescriptor,
} from './vApplicationProperty';
import {
	ApplicationProperty,
} from '../../ddl/application/ApplicationProperty';
import {
	ApplicationRelationVDescriptor,
} from './vApplicationRelation';
import {
	ApplicationRelation,
} from '../../ddl/application/ApplicationRelation';
import {
	IApplicationEntity,
} from './ApplicationEntity';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationEntityVDescriptor<T>
    extends VersionedApplicationObjectVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	index?: number | IVNumberField;
	isLocal?: boolean | IVBooleanField;
	isAirEntity?: boolean | IVBooleanField;
	name?: string | IVStringField;
	tableConfig?: ApplicationEntity_TableConfiguration | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>
	columns?: ApplicationColumnVDescriptor<ApplicationColumn>
	operations?: ApplicationOperationVDescriptor<ApplicationOperation>
	properties?: ApplicationPropertyVDescriptor<ApplicationProperty>
	relations?: ApplicationRelationVDescriptor<ApplicationRelation>
	relationReferences?: ApplicationRelationVDescriptor<ApplicationRelation>

}


