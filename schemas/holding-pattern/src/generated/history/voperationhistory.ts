import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ApplicationEntityVDescriptor,
	IApplicationEntity,
} from '@airport/airspace';
import {
	ActorVDescriptor,
} from '../infrastructure/vactor';
import {
	IActor,
} from '../infrastructure/actor';
import {
	RepositoryTransactionHistoryVDescriptor,
} from './vrepositorytransactionhistory';
import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';
import {
	RecordHistoryVDescriptor,
} from './vrecordhistory';
import {
	IRecordHistory,
} from './recordhistory';
import {
	IOperationHistory,
} from './operationhistory';



////////////////////
//  API INTERFACE //
////////////////////

export interface OperationHistoryVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	orderNumber?: number | IVNumberField;
	changeType?: string | IVStringField;
	systemWideOperationId?: number | IVNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityVDescriptor;
	actor?: ActorVDescriptor;
	repositoryTransactionHistory?: RepositoryTransactionHistoryVDescriptor;
	recordHistory?: RecordHistoryVDescriptor;

}


