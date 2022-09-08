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
} from '@airport/airspace/dist/app/bundle';
import {
	ActorVDescriptor,
} from '../infrastructure/vActor';
import {
	Actor,
} from '../../ddl/infrastructure/Actor';
import {
	RepositoryTransactionHistoryVDescriptor,
} from './vRepositoryTransactionHistory';
import {
	RepositoryTransactionHistory,
} from '../../ddl/history/RepositoryTransactionHistory';
import {
	RecordHistoryVDescriptor,
} from './vRecordHistory';
import {
	RecordHistory,
} from '../../ddl/history/RecordHistory';
import {
	IOperationHistory,
} from './OperationHistory';



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


