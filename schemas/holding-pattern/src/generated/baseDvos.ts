/* eslint-disable */
import {
	Actor,
} from '../ddl/infrastructure/Actor';
import {
	ActorVDescriptor,
} from './infrastructure/vActor';
import {
	OperationHistory,
} from '../ddl/history/OperationHistory';
import {
	OperationHistoryVDescriptor,
} from './history/vOperationHistory';
import {
	RecordHistory,
} from '../ddl/history/RecordHistory';
import {
	RecordHistoryVDescriptor,
} from './history/vRecordHistory';
import {
	RecordHistoryNewValue,
} from '../ddl/history/RecordHistoryNewValue';
import {
	RecordHistoryNewValueVDescriptor,
} from './history/vRecordHistoryNewValue';
import {
	RecordHistoryOldValue,
} from '../ddl/history/RecordHistoryOldValue';
import {
	RecordHistoryOldValueVDescriptor,
} from './history/vRecordHistoryOldValue';
import {
	Repository,
} from '../ddl/repository/Repository';
import {
	RepositoryVDescriptor,
} from './repository/vRepository';
import {
	RepositoryApplication,
} from '../ddl/repository/RepositoryApplication';
import {
	RepositoryApplicationVDescriptor,
} from './repository/vRepositoryApplication';
import {
	RepositoryClient,
} from '../ddl/repository/RepositoryClient';
import {
	RepositoryClientVDescriptor,
} from './repository/vRepositoryClient';
import {
	RepositoryDatabase,
} from '../ddl/repository/RepositoryDatabase';
import {
	RepositoryDatabaseVDescriptor,
} from './repository/vRepositoryDatabase';
import {
	RepositoryTerminal,
} from '../ddl/repository/RepositoryTerminal';
import {
	RepositoryTerminalVDescriptor,
} from './repository/vRepositoryTerminal';
import {
	RepositoryTransactionHistory,
} from '../ddl/history/RepositoryTransactionHistory';
import {
	RepositoryTransactionHistoryVDescriptor,
} from './history/vRepositoryTransactionHistory';
import {
	RepositoryType,
} from '../ddl/repository/RepositoryType';
import {
	RepositoryTypeVDescriptor,
} from './repository/vRepositoryType';
import {
	TransactionHistory,
} from '../ddl/history/TransactionHistory';
import {
	TransactionHistoryVDescriptor,
} from './history/vTransactionHistory';
import {
	IDvo,
	Dvo,
} from '@airbridge/validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	air____at_airport_slash_holding_dash_pattern_diSet,
} from './qApplication';

import Q from './qApplication'

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
  extends IDvo<Actor, ActorVDescriptor<Actor>> {
}

export class BaseActorDvo
  extends SQDIDvo<Actor, ActorVDescriptor<Actor>>
	implements IBaseActorDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseOperationHistoryDvo
  extends IDvo<OperationHistory, OperationHistoryVDescriptor<OperationHistory>> {
}

export class BaseOperationHistoryDvo
  extends SQDIDvo<OperationHistory, OperationHistoryVDescriptor<OperationHistory>>
	implements IBaseOperationHistoryDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseRecordHistoryDvo
  extends IDvo<RecordHistory, RecordHistoryVDescriptor<RecordHistory>> {
}

export class BaseRecordHistoryDvo
  extends SQDIDvo<RecordHistory, RecordHistoryVDescriptor<RecordHistory>>
	implements IBaseRecordHistoryDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseRecordHistoryNewValueDvo
  extends IDvo<RecordHistoryNewValue, RecordHistoryNewValueVDescriptor<RecordHistoryNewValue>> {
}

export class BaseRecordHistoryNewValueDvo
  extends SQDIDvo<RecordHistoryNewValue, RecordHistoryNewValueVDescriptor<RecordHistoryNewValue>>
	implements IBaseRecordHistoryNewValueDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseRecordHistoryOldValueDvo
  extends IDvo<RecordHistoryOldValue, RecordHistoryOldValueVDescriptor<RecordHistoryOldValue>> {
}

export class BaseRecordHistoryOldValueDvo
  extends SQDIDvo<RecordHistoryOldValue, RecordHistoryOldValueVDescriptor<RecordHistoryOldValue>>
	implements IBaseRecordHistoryOldValueDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseRepositoryDvo
  extends IDvo<Repository, RepositoryVDescriptor<Repository>> {
}

export class BaseRepositoryDvo
  extends SQDIDvo<Repository, RepositoryVDescriptor<Repository>>
	implements IBaseRepositoryDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryApplicationDvo
  extends IDvo<RepositoryApplication, RepositoryApplicationVDescriptor<RepositoryApplication>> {
}

export class BaseRepositoryApplicationDvo
  extends SQDIDvo<RepositoryApplication, RepositoryApplicationVDescriptor<RepositoryApplication>>
	implements IBaseRepositoryApplicationDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseRepositoryClientDvo
  extends IDvo<RepositoryClient, RepositoryClientVDescriptor<RepositoryClient>> {
}

export class BaseRepositoryClientDvo
  extends SQDIDvo<RepositoryClient, RepositoryClientVDescriptor<RepositoryClient>>
	implements IBaseRepositoryClientDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseRepositoryDatabaseDvo
  extends IDvo<RepositoryDatabase, RepositoryDatabaseVDescriptor<RepositoryDatabase>> {
}

export class BaseRepositoryDatabaseDvo
  extends SQDIDvo<RepositoryDatabase, RepositoryDatabaseVDescriptor<RepositoryDatabase>>
	implements IBaseRepositoryDatabaseDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRepositoryTerminalDvo
  extends IDvo<RepositoryTerminal, RepositoryTerminalVDescriptor<RepositoryTerminal>> {
}

export class BaseRepositoryTerminalDvo
  extends SQDIDvo<RepositoryTerminal, RepositoryTerminalVDescriptor<RepositoryTerminal>>
	implements IBaseRepositoryTerminalDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseRepositoryTransactionHistoryDvo
  extends IDvo<RepositoryTransactionHistory, RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>> {
}

export class BaseRepositoryTransactionHistoryDvo
  extends SQDIDvo<RepositoryTransactionHistory, RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>>
	implements IBaseRepositoryTransactionHistoryDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseRepositoryTypeDvo
  extends IDvo<RepositoryType, RepositoryTypeVDescriptor<RepositoryType>> {
}

export class BaseRepositoryTypeDvo
  extends SQDIDvo<RepositoryType, RepositoryTypeVDescriptor<RepositoryType>>
	implements IBaseRepositoryTypeDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseTransactionHistoryDvo
  extends IDvo<TransactionHistory, TransactionHistoryVDescriptor<TransactionHistory>> {
}

export class BaseTransactionHistoryDvo
  extends SQDIDvo<TransactionHistory, TransactionHistoryVDescriptor<TransactionHistory>>
	implements IBaseTransactionHistoryDvo {

	static diSet(): boolean {
		return air____at_airport_slash_holding_dash_pattern_diSet(10)
	}
	
	constructor() {
		super(10)
	}
}
