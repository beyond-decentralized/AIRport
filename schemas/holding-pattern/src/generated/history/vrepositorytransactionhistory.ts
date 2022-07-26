import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	RepositoryVDescriptor,
} from '../repository/vrepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	TransactionHistoryVDescriptor,
} from './vtransactionhistory';
import {
	TransactionHistory,
} from '../../ddl/history/TransactionHistory';
import {
	OperationHistoryVDescriptor,
} from './voperationhistory';
import {
	OperationHistory,
} from '../../ddl/history/OperationHistory';
import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryTransactionHistoryVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	repositoryTransactionType?: string | IVStringField;
	saveTimestamp?: number | IVNumberField;
	syncTimestamp?: number | IVNumberField;
	GUID?: string | IVStringField;
	isRepositoryCreation?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryVDescriptor<Repository>
	transactionHistory?: TransactionHistoryVDescriptor<TransactionHistory>
	operationHistory?: OperationHistoryVDescriptor<OperationHistory>

}


