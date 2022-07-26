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
	IRepository,
} from '../repository/repository';
import {
	TransactionHistoryVDescriptor,
} from './vtransactionhistory';
import {
	ITransactionHistory,
} from './transactionhistory';
import {
	OperationHistoryVDescriptor,
} from './voperationhistory';
import {
	IOperationHistory,
} from './operationhistory';
import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryTransactionHistoryVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	repositoryTransactionType?: string | IVStringField;
	saveTimestamp?: number | IVNumberField;
	syncTimestamp?: number | IVNumberField;
	GUID?: string | IVStringField;
	isRepositoryCreation?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryVDescriptor;
	transactionHistory?: TransactionHistoryVDescriptor;
	operationHistory?: OperationHistoryVDescriptor;

}


