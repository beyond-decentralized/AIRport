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
	ApplicationEntity_TableConfiguration,
} from '@airport/tarmaq-entity';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	IApplicationVersion,
} from './applicationversion';
import {
	ApplicationColumnVDescriptor,
} from './vapplicationcolumn';
import {
	IApplicationColumn,
} from './applicationcolumn';
import {
	ApplicationOperationVDescriptor,
} from './vapplicationoperation';
import {
	IApplicationOperation,
} from './applicationoperation';
import {
	ApplicationPropertyVDescriptor,
} from './vapplicationproperty';
import {
	IApplicationProperty,
} from './applicationproperty';
import {
	ApplicationRelationVDescriptor,
} from './vapplicationrelation';
import {
	IApplicationRelation,
} from './applicationrelation';
import {
	IApplicationEntity,
} from './applicationentity';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationEntityVDescriptor
    extends VersionedApplicationObjectVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	index?: number | IVNumberField;
	isLocal?: boolean | IVBooleanField;
	isAirEntity?: boolean | IVBooleanField;
	name?: string | IVStringField;
	tableConfig?: ApplicationEntity_TableConfiguration | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applicationVersion?: ApplicationVersionVDescriptor;
	columns?: ApplicationColumnVDescriptor;
	operations?: ApplicationOperationVDescriptor;
	properties?: ApplicationPropertyVDescriptor;
	relations?: ApplicationRelationVDescriptor;
	relationReferences?: ApplicationRelationVDescriptor;

}


