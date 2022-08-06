import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	RepositoryTransactionHistoryVDescriptor,
} from './vrepositorytransactionhistory';
import {
	RepositoryTransactionHistory,
} from '../../ddl/history/RepositoryTransactionHistory';
import {
	ITransactionHistory,
} from './transactionhistory';



////////////////////
//  API INTERFACE //
////////////////////

export interface TransactionHistoryVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	transactionType?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repositoryTransactionHistories?: RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>

}


