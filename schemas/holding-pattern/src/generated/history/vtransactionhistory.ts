import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	RepositoryTransactionHistoryVDescriptor,
} from './vrepositorytransactionhistory';
import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';
import {
	ITransactionHistory,
} from './transactionhistory';



////////////////////
//  API INTERFACE //
////////////////////

export interface TransactionHistoryVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	transactionType?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repositoryTransactionHistories?: RepositoryTransactionHistoryVDescriptor;

}


