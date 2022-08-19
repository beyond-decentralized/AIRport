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
	ApplicationEntity_TableConfiguration,
} from '@airport/tarmaq-entity';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	ApplicationVersion,
} from '../../ddl/application/ApplicationVersion';
import {
	ApplicationColumnVDescriptor,
} from './vapplicationcolumn';
import {
	ApplicationColumn,
} from '../../ddl/application/ApplicationColumn';
import {
	ApplicationOperationVDescriptor,
} from './vapplicationoperation';
import {
	ApplicationOperation,
} from '../../ddl/application/ApplicationOperation';
import {
	ApplicationPropertyVDescriptor,
} from './vapplicationproperty';
import {
	ApplicationProperty,
} from '../../ddl/application/ApplicationProperty';
import {
	ApplicationRelationVDescriptor,
} from './vapplicationrelation';
import {
	ApplicationRelation,
} from '../../ddl/application/ApplicationRelation';
import {
	IApplicationEntity,
} from './applicationentity';



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


