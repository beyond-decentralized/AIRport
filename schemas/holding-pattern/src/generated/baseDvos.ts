/* eslint-disable */
import {
	Actor,
} from '../ddl/infrastructure/actor';
import {
	ActorVDescriptor,
} from './infrastructure/vactor';
import {
	OperationHistory,
} from '../ddl/history/operationhistory';
import {
	OperationHistoryVDescriptor,
} from './history/voperationhistory';
import {
	RecordHistory,
} from '../ddl/history/recordhistory';
import {
	RecordHistoryVDescriptor,
} from './history/vrecordhistory';
import {
	RecordHistoryNewValue,
} from '../ddl/history/recordhistorynewvalue';
import {
	RecordHistoryNewValueVDescriptor,
} from './history/vrecordhistorynewvalue';
import {
	RecordHistoryOldValue,
} from '../ddl/history/recordhistoryoldvalue';
import {
	RecordHistoryOldValueVDescriptor,
} from './history/vrecordhistoryoldvalue';
import {
	Repository,
} from '../ddl/repository/repository';
import {
	RepositoryVDescriptor,
} from './repository/vrepository';
import {
	RepositoryApplication,
} from '../ddl/repository/repositoryapplication';
import {
	RepositoryApplicationVDescriptor,
} from './repository/vrepositoryapplication';
import {
	RepositoryClient,
} from '../ddl/repository/repositoryclient';
import {
	RepositoryClientVDescriptor,
} from './repository/vrepositoryclient';
import {
	RepositoryDatabase,
} from '../ddl/repository/repositorydatabase';
import {
	RepositoryDatabaseVDescriptor,
} from './repository/vrepositorydatabase';
import {
	RepositoryTerminal,
} from '../ddl/repository/repositoryterminal';
import {
	RepositoryTerminalVDescriptor,
} from './repository/vrepositoryterminal';
import {
	RepositoryTransactionHistory,
} from '../ddl/history/repositorytransactionhistory';
import {
	RepositoryTransactionHistoryVDescriptor,
} from './history/vrepositorytransactionhistory';
import {
	RepositoryType,
} from '../ddl/repository/repositorytype';
import {
	RepositoryTypeVDescriptor,
} from './repository/vrepositorytype';
import {
	TransactionHistory,
} from '../ddl/history/transactionhistory';
import {
	TransactionHistoryVDescriptor,
} from './history/vtransactionhistory';
import {
	IDvo,
	Dvo,
} from '@airport/airbridge-validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo<Entity, EntityVDescriptor>
	extends Dvo<Entity, EntityVDescriptor> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseActorDvo
  extends IDvo<Actor, ActorVDescriptor> {
}

export class BaseActorDvo
  extends SQDIDvo<Actor, ActorVDescriptor>
	implements IBaseActorDvo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseOperationHistoryDvo
  extends IDvo<OperationHistory, OperationHistoryVDescriptor> {
}

export class BaseOperationHistoryDvo
  extends SQDIDvo<OperationHistory, OperationHistoryVDescriptor>
	implements IBaseOperationHistoryDvo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseRecordHistoryDvo
  extends IDvo<RecordHistory, RecordHistoryVDescriptor> {
}

export class BaseRecordHistoryDvo
  extends SQDIDvo<RecordHistory, RecordHistoryVDescriptor>
	implements IBaseRecordHistoryDvo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseRecordHistoryNewValueDvo
  extends IDvo<RecordHistoryNewValue, RecordHistoryNewValueVDescriptor> {
}

export class BaseRecordHistoryNewValueDvo
  extends SQDIDvo<RecordHistoryNewValue, RecordHistoryNewValueVDescriptor>
	implements IBaseRecordHistoryNewValueDvo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseRecordHistoryOldValueDvo
  extends IDvo<RecordHistoryOldValue, RecordHistoryOldValueVDescriptor> {
}

export class BaseRecordHistoryOldValueDvo
  extends SQDIDvo<RecordHistoryOldValue, RecordHistoryOldValueVDescriptor>
	implements IBaseRecordHistoryOldValueDvo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseRepositoryDvo
  extends IDvo<Repository, RepositoryVDescriptor> {
}

export class BaseRepositoryDvo
  extends SQDIDvo<Repository, RepositoryVDescriptor>
	implements IBaseRepositoryDvo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryApplicationDvo
  extends IDvo<RepositoryApplication, RepositoryApplicationVDescriptor> {
}

export class BaseRepositoryApplicationDvo
  extends SQDIDvo<RepositoryApplication, RepositoryApplicationVDescriptor>
	implements IBaseRepositoryApplicationDvo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseRepositoryClientDvo
  extends IDvo<RepositoryClient, RepositoryClientVDescriptor> {
}

export class BaseRepositoryClientDvo
  extends SQDIDvo<RepositoryClient, RepositoryClientVDescriptor>
	implements IBaseRepositoryClientDvo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseRepositoryDatabaseDvo
  extends IDvo<RepositoryDatabase, RepositoryDatabaseVDescriptor> {
}

export class BaseRepositoryDatabaseDvo
  extends SQDIDvo<RepositoryDatabase, RepositoryDatabaseVDescriptor>
	implements IBaseRepositoryDatabaseDvo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRepositoryTerminalDvo
  extends IDvo<RepositoryTerminal, RepositoryTerminalVDescriptor> {
}

export class BaseRepositoryTerminalDvo
  extends SQDIDvo<RepositoryTerminal, RepositoryTerminalVDescriptor>
	implements IBaseRepositoryTerminalDvo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseRepositoryTransactionHistoryDvo
  extends IDvo<RepositoryTransactionHistory, RepositoryTransactionHistoryVDescriptor> {
}

export class BaseRepositoryTransactionHistoryDvo
  extends SQDIDvo<RepositoryTransactionHistory, RepositoryTransactionHistoryVDescriptor>
	implements IBaseRepositoryTransactionHistoryDvo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseRepositoryTypeDvo
  extends IDvo<RepositoryType, RepositoryTypeVDescriptor> {
}

export class BaseRepositoryTypeDvo
  extends SQDIDvo<RepositoryType, RepositoryTypeVDescriptor>
	implements IBaseRepositoryTypeDvo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseTransactionHistoryDvo
  extends IDvo<TransactionHistory, TransactionHistoryVDescriptor> {
}

export class BaseTransactionHistoryDvo
  extends SQDIDvo<TransactionHistory, TransactionHistoryVDescriptor>
	implements IBaseTransactionHistoryDvo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}
