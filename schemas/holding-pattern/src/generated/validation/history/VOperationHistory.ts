import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ApplicationEntityVDescriptor,
	ApplicationEntity,
} from '@airport/airspace';
import {
	ActorVDescriptor,
} from '../infrastructure/VActor';
import {
	Actor,
} from '../../../ddl/infrastructure/Actor';
import {
	RepositoryTransactionHistoryVDescriptor,
} from './VRepositoryTransactionHistory';
import {
	RepositoryTransactionHistory,
} from '../../../ddl/history/RepositoryTransactionHistory';
import {
	RecordHistoryVDescriptor,
} from './VRecordHistory';
import {
	RecordHistory,
} from '../../../ddl/history/RecordHistory';
import {
	IOperationHistory,
} from '../../entity/history/IOperationHistory';



////////////////////
//  API INTERFACE //
////////////////////

export interface OperationHistoryVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	orderNumber?: number | IVNumberField;
	changeType?: string | IVStringField;
	systemWideOperationId?: number | IVNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityVDescriptor<ApplicationEntity>
	actor?: ActorVDescriptor<Actor>
	repositoryTransactionHistory?: RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>
	recordHistory?: RecordHistoryVDescriptor<RecordHistory>

}


