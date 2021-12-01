/* eslint-disable */
import {
	IMissingRecord,
} from './missingRecord/missingrecord';
import {
	MissingRecordESelect,
	MissingRecordECreateColumns,
	MissingRecordECreateProperties,
	MissingRecordEUpdateColumns,
	MissingRecordEUpdateProperties,
	MissingRecordEId,
	MissingRecordGraph,
	QMissingRecord,
} from './missingRecord/qmissingrecord';
import {
	IMissingRecordRepoTransBlock,
} from './missingRecord/missingrecordrepotransblock';
import {
	MissingRecordRepoTransBlockESelect,
	MissingRecordRepoTransBlockECreateColumns,
	MissingRecordRepoTransBlockECreateProperties,
	MissingRecordRepoTransBlockEUpdateColumns,
	MissingRecordRepoTransBlockEUpdateProperties,
	MissingRecordRepoTransBlockEId,
	MissingRecordRepoTransBlockGraph,
	QMissingRecordRepoTransBlock,
} from './missingRecord/qmissingrecordrepotransblock';
import {
	IRecordUpdateStage,
} from './recordupdatestage';
import {
	RecordUpdateStageESelect,
	RecordUpdateStageECreateColumns,
	RecordUpdateStageECreateProperties,
	RecordUpdateStageEUpdateColumns,
	RecordUpdateStageEUpdateProperties,
	RecordUpdateStageEId,
	RecordUpdateStageGraph,
	QRecordUpdateStage,
} from './qrecordupdatestage';
import {
	IRepoTransBlockResponseStage,
} from './repositoryTransactionBlock/repotransblockresponsestage';
import {
	RepoTransBlockResponseStageESelect,
	RepoTransBlockResponseStageECreateColumns,
	RepoTransBlockResponseStageECreateProperties,
	RepoTransBlockResponseStageEUpdateColumns,
	RepoTransBlockResponseStageEUpdateProperties,
	RepoTransBlockResponseStageEId,
	RepoTransBlockResponseStageGraph,
	QRepoTransBlockResponseStage,
} from './repositoryTransactionBlock/qrepotransblockresponsestage';
import {
	IRepoTransBlockApplicationToChange,
} from './repositoryTransactionBlock/repotransblockapplicationtochange';
import {
	RepoTransBlockApplicationToChangeESelect,
	RepoTransBlockApplicationToChangeECreateColumns,
	RepoTransBlockApplicationToChangeECreateProperties,
	RepoTransBlockApplicationToChangeEUpdateColumns,
	RepoTransBlockApplicationToChangeEUpdateProperties,
	RepoTransBlockApplicationToChangeEId,
	RepoTransBlockApplicationToChangeGraph,
	QRepoTransBlockApplicationToChange,
} from './repositoryTransactionBlock/qrepotransblockapplicationtochange';
import {
	IRepositoryTransactionBlock,
} from './repositoryTransactionBlock/repositorytransactionblock';
import {
	RepositoryTransactionBlockESelect,
	RepositoryTransactionBlockECreateColumns,
	RepositoryTransactionBlockECreateProperties,
	RepositoryTransactionBlockEUpdateColumns,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockEId,
	RepositoryTransactionBlockGraph,
	QRepositoryTransactionBlock,
} from './repositoryTransactionBlock/qrepositorytransactionblock';
import {
	IRepositoryTransactionHistoryUpdateStage,
} from './repositoryTransactionBlock/repositorytransactionhistoryupdatestage';
import {
	RepositoryTransactionHistoryUpdateStageESelect,
	RepositoryTransactionHistoryUpdateStageECreateColumns,
	RepositoryTransactionHistoryUpdateStageECreateProperties,
	RepositoryTransactionHistoryUpdateStageEUpdateColumns,
	RepositoryTransactionHistoryUpdateStageEUpdateProperties,
	RepositoryTransactionHistoryUpdateStageEId,
	RepositoryTransactionHistoryUpdateStageGraph,
	QRepositoryTransactionHistoryUpdateStage,
} from './repositoryTransactionBlock/qrepositorytransactionhistoryupdatestage';
import {
	ISharingMessage,
} from './sharingMessage/sharingmessage';
import {
	SharingMessageESelect,
	SharingMessageECreateColumns,
	SharingMessageECreateProperties,
	SharingMessageEUpdateColumns,
	SharingMessageEUpdateProperties,
	SharingMessageEId,
	SharingMessageGraph,
	QSharingMessage,
} from './sharingMessage/qsharingmessage';
import {
	ISharingMessageRepoTransBlock,
} from './sharingMessage/sharingmessagerepotransblock';
import {
	SharingMessageRepoTransBlockESelect,
	SharingMessageRepoTransBlockECreateColumns,
	SharingMessageRepoTransBlockECreateProperties,
	SharingMessageRepoTransBlockEUpdateColumns,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockEId,
	SharingMessageRepoTransBlockGraph,
	QSharingMessageRepoTransBlock,
} from './sharingMessage/qsharingmessagerepotransblock';
import {
	ISharingNode,
} from './sharingNode/sharingnode';
import {
	SharingNodeESelect,
	SharingNodeECreateColumns,
	SharingNodeECreateProperties,
	SharingNodeEUpdateColumns,
	SharingNodeEUpdateProperties,
	SharingNodeEId,
	SharingNodeGraph,
	QSharingNode,
} from './sharingNode/qsharingnode';
import {
	ISharingNodeRepoTransBlock,
} from './sharingNode/sharingnoderepotransblock';
import {
	SharingNodeRepoTransBlockESelect,
	SharingNodeRepoTransBlockECreateColumns,
	SharingNodeRepoTransBlockECreateProperties,
	SharingNodeRepoTransBlockEUpdateColumns,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockEId,
	SharingNodeRepoTransBlockGraph,
	QSharingNodeRepoTransBlock,
} from './sharingNode/qsharingnoderepotransblock';
import {
	ISharingNodeRepoTransBlockStage,
} from './sharingNode/sharingnoderepotransblockstage';
import {
	SharingNodeRepoTransBlockStageESelect,
	SharingNodeRepoTransBlockStageECreateColumns,
	SharingNodeRepoTransBlockStageECreateProperties,
	SharingNodeRepoTransBlockStageEUpdateColumns,
	SharingNodeRepoTransBlockStageEUpdateProperties,
	SharingNodeRepoTransBlockStageEId,
	SharingNodeRepoTransBlockStageGraph,
	QSharingNodeRepoTransBlockStage,
} from './sharingNode/qsharingnoderepotransblockstage';
import {
	ISharingNodeRepository,
} from './sharingNode/sharingnoderepository';
import {
	SharingNodeRepositoryESelect,
	SharingNodeRepositoryECreateColumns,
	SharingNodeRepositoryECreateProperties,
	SharingNodeRepositoryEUpdateColumns,
	SharingNodeRepositoryEUpdateProperties,
	SharingNodeRepositoryEId,
	SharingNodeRepositoryGraph,
	QSharingNodeRepository,
} from './sharingNode/qsharingnoderepository';
import {
	ISharingNodeTerminal,
} from './sharingNode/sharingnodeterminal';
import {
	SharingNodeTerminalESelect,
	SharingNodeTerminalECreateColumns,
	SharingNodeTerminalECreateProperties,
	SharingNodeTerminalEUpdateColumns,
	SharingNodeTerminalEUpdateProperties,
	SharingNodeTerminalEId,
	SharingNodeTerminalGraph,
	QSharingNodeTerminal,
} from './sharingNode/qsharingnodeterminal';
import {
	ISynchronizationConflict,
} from './conflict/synchronizationconflict';
import {
	SynchronizationConflictESelect,
	SynchronizationConflictECreateColumns,
	SynchronizationConflictECreateProperties,
	SynchronizationConflictEUpdateColumns,
	SynchronizationConflictEUpdateProperties,
	SynchronizationConflictEId,
	SynchronizationConflictGraph,
	QSynchronizationConflict,
} from './conflict/qsynchronizationconflict';
import {
	ISynchronizationConflictPendingNotification,
} from './conflict/synchronizationconflictpendingnotification';
import {
	SynchronizationConflictPendingNotificationESelect,
	SynchronizationConflictPendingNotificationECreateColumns,
	SynchronizationConflictPendingNotificationECreateProperties,
	SynchronizationConflictPendingNotificationEUpdateColumns,
	SynchronizationConflictPendingNotificationEUpdateProperties,
	SynchronizationConflictPendingNotificationEId,
	SynchronizationConflictPendingNotificationGraph,
	QSynchronizationConflictPendingNotification,
} from './conflict/qsynchronizationconflictpendingnotification';
import {
	ISynchronizationConflictValues,
} from './conflict/synchronizationconflictvalues';
import {
	SynchronizationConflictValuesESelect,
	SynchronizationConflictValuesECreateColumns,
	SynchronizationConflictValuesECreateProperties,
	SynchronizationConflictValuesEUpdateColumns,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesEId,
	SynchronizationConflictValuesGraph,
	QSynchronizationConflictValues,
} from './conflict/qsynchronizationconflictvalues';
import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Dao,
	DaoQueryDecorators,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseMissingRecordDao
  extends IDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord> {
}

export class BaseMissingRecordDao
  extends SQDIDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord>
	implements IBaseMissingRecordDao {
	
	static Find      = new DaoQueryDecorators<MissingRecordESelect>();
	static FindOne   = new DaoQueryDecorators<MissingRecordESelect>();
	static Search    = new DaoQueryDecorators<MissingRecordESelect>();
	static SearchOne = new DaoQueryDecorators<MissingRecordESelect>();
	static Save(
		config: MissingRecordGraph
	): PropertyDecorator {
		return Dao.BaseSave<MissingRecordGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseMissingRecordRepoTransBlockDao
  extends IDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockGraph, QMissingRecordRepoTransBlock> {
}

export class BaseMissingRecordRepoTransBlockDao
  extends SQDIDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockGraph, QMissingRecordRepoTransBlock>
	implements IBaseMissingRecordRepoTransBlockDao {
	
	static Find      = new DaoQueryDecorators<MissingRecordRepoTransBlockESelect>();
	static FindOne   = new DaoQueryDecorators<MissingRecordRepoTransBlockESelect>();
	static Search    = new DaoQueryDecorators<MissingRecordRepoTransBlockESelect>();
	static SearchOne = new DaoQueryDecorators<MissingRecordRepoTransBlockESelect>();
	static Save(
		config: MissingRecordRepoTransBlockGraph
	): PropertyDecorator {
		return Dao.BaseSave<MissingRecordRepoTransBlockGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseRecordUpdateStageDao
  extends IDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDao
  extends SQDIDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDao {
	
	static Find      = new DaoQueryDecorators<RecordUpdateStageESelect>();
	static FindOne   = new DaoQueryDecorators<RecordUpdateStageESelect>();
	static Search    = new DaoQueryDecorators<RecordUpdateStageESelect>();
	static SearchOne = new DaoQueryDecorators<RecordUpdateStageESelect>();
	static Save(
		config: RecordUpdateStageGraph
	): PropertyDecorator {
		return Dao.BaseSave<RecordUpdateStageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseRepoTransBlockResponseStageDao
  extends IDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageGraph, QRepoTransBlockResponseStage> {
}

export class BaseRepoTransBlockResponseStageDao
  extends SQDIDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageGraph, QRepoTransBlockResponseStage>
	implements IBaseRepoTransBlockResponseStageDao {
	
	static Find      = new DaoQueryDecorators<RepoTransBlockResponseStageESelect>();
	static FindOne   = new DaoQueryDecorators<RepoTransBlockResponseStageESelect>();
	static Search    = new DaoQueryDecorators<RepoTransBlockResponseStageESelect>();
	static SearchOne = new DaoQueryDecorators<RepoTransBlockResponseStageESelect>();
	static Save(
		config: RepoTransBlockResponseStageGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepoTransBlockResponseStageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseRepoTransBlockApplicationToChangeDao
  extends IDao<IRepoTransBlockApplicationToChange, RepoTransBlockApplicationToChangeESelect, RepoTransBlockApplicationToChangeECreateProperties, RepoTransBlockApplicationToChangeEUpdateColumns, RepoTransBlockApplicationToChangeEUpdateProperties, RepoTransBlockApplicationToChangeEId, RepoTransBlockApplicationToChangeGraph, QRepoTransBlockApplicationToChange> {
}

export class BaseRepoTransBlockApplicationToChangeDao
  extends SQDIDao<IRepoTransBlockApplicationToChange, RepoTransBlockApplicationToChangeESelect, RepoTransBlockApplicationToChangeECreateProperties, RepoTransBlockApplicationToChangeEUpdateColumns, RepoTransBlockApplicationToChangeEUpdateProperties, RepoTransBlockApplicationToChangeEId, RepoTransBlockApplicationToChangeGraph, QRepoTransBlockApplicationToChange>
	implements IBaseRepoTransBlockApplicationToChangeDao {
	
	static Find      = new DaoQueryDecorators<RepoTransBlockApplicationToChangeESelect>();
	static FindOne   = new DaoQueryDecorators<RepoTransBlockApplicationToChangeESelect>();
	static Search    = new DaoQueryDecorators<RepoTransBlockApplicationToChangeESelect>();
	static SearchOne = new DaoQueryDecorators<RepoTransBlockApplicationToChangeESelect>();
	static Save(
		config: RepoTransBlockApplicationToChangeGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepoTransBlockApplicationToChangeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseRepositoryTransactionBlockDao
  extends IDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockGraph, QRepositoryTransactionBlock> {
}

export class BaseRepositoryTransactionBlockDao
  extends SQDIDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockGraph, QRepositoryTransactionBlock>
	implements IBaseRepositoryTransactionBlockDao {
	
	static Find      = new DaoQueryDecorators<RepositoryTransactionBlockESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryTransactionBlockESelect>();
	static Search    = new DaoQueryDecorators<RepositoryTransactionBlockESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryTransactionBlockESelect>();
	static Save(
		config: RepositoryTransactionBlockGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryTransactionBlockGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryTransactionHistoryUpdateStageDao
  extends IDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageGraph, QRepositoryTransactionHistoryUpdateStage> {
}

export class BaseRepositoryTransactionHistoryUpdateStageDao
  extends SQDIDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageGraph, QRepositoryTransactionHistoryUpdateStage>
	implements IBaseRepositoryTransactionHistoryUpdateStageDao {
	
	static Find      = new DaoQueryDecorators<RepositoryTransactionHistoryUpdateStageESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryTransactionHistoryUpdateStageESelect>();
	static Search    = new DaoQueryDecorators<RepositoryTransactionHistoryUpdateStageESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryTransactionHistoryUpdateStageESelect>();
	static Save(
		config: RepositoryTransactionHistoryUpdateStageGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryTransactionHistoryUpdateStageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseSharingMessageDao
  extends IDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageGraph, QSharingMessage> {
}

export class BaseSharingMessageDao
  extends SQDIDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageGraph, QSharingMessage>
	implements IBaseSharingMessageDao {
	
	static Find      = new DaoQueryDecorators<SharingMessageESelect>();
	static FindOne   = new DaoQueryDecorators<SharingMessageESelect>();
	static Search    = new DaoQueryDecorators<SharingMessageESelect>();
	static SearchOne = new DaoQueryDecorators<SharingMessageESelect>();
	static Save(
		config: SharingMessageGraph
	): PropertyDecorator {
		return Dao.BaseSave<SharingMessageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseSharingMessageRepoTransBlockDao
  extends IDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockGraph, QSharingMessageRepoTransBlock> {
}

export class BaseSharingMessageRepoTransBlockDao
  extends SQDIDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockGraph, QSharingMessageRepoTransBlock>
	implements IBaseSharingMessageRepoTransBlockDao {
	
	static Find      = new DaoQueryDecorators<SharingMessageRepoTransBlockESelect>();
	static FindOne   = new DaoQueryDecorators<SharingMessageRepoTransBlockESelect>();
	static Search    = new DaoQueryDecorators<SharingMessageRepoTransBlockESelect>();
	static SearchOne = new DaoQueryDecorators<SharingMessageRepoTransBlockESelect>();
	static Save(
		config: SharingMessageRepoTransBlockGraph
	): PropertyDecorator {
		return Dao.BaseSave<SharingMessageRepoTransBlockGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseSharingNodeDao
  extends IDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeGraph, QSharingNode> {
}

export class BaseSharingNodeDao
  extends SQDIDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeGraph, QSharingNode>
	implements IBaseSharingNodeDao {
	
	static Find      = new DaoQueryDecorators<SharingNodeESelect>();
	static FindOne   = new DaoQueryDecorators<SharingNodeESelect>();
	static Search    = new DaoQueryDecorators<SharingNodeESelect>();
	static SearchOne = new DaoQueryDecorators<SharingNodeESelect>();
	static Save(
		config: SharingNodeGraph
	): PropertyDecorator {
		return Dao.BaseSave<SharingNodeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseSharingNodeRepoTransBlockDao
  extends IDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockGraph, QSharingNodeRepoTransBlock> {
}

export class BaseSharingNodeRepoTransBlockDao
  extends SQDIDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockGraph, QSharingNodeRepoTransBlock>
	implements IBaseSharingNodeRepoTransBlockDao {
	
	static Find      = new DaoQueryDecorators<SharingNodeRepoTransBlockESelect>();
	static FindOne   = new DaoQueryDecorators<SharingNodeRepoTransBlockESelect>();
	static Search    = new DaoQueryDecorators<SharingNodeRepoTransBlockESelect>();
	static SearchOne = new DaoQueryDecorators<SharingNodeRepoTransBlockESelect>();
	static Save(
		config: SharingNodeRepoTransBlockGraph
	): PropertyDecorator {
		return Dao.BaseSave<SharingNodeRepoTransBlockGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseSharingNodeRepoTransBlockStageDao
  extends IDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageGraph, QSharingNodeRepoTransBlockStage> {
}

export class BaseSharingNodeRepoTransBlockStageDao
  extends SQDIDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageGraph, QSharingNodeRepoTransBlockStage>
	implements IBaseSharingNodeRepoTransBlockStageDao {
	
	static Find      = new DaoQueryDecorators<SharingNodeRepoTransBlockStageESelect>();
	static FindOne   = new DaoQueryDecorators<SharingNodeRepoTransBlockStageESelect>();
	static Search    = new DaoQueryDecorators<SharingNodeRepoTransBlockStageESelect>();
	static SearchOne = new DaoQueryDecorators<SharingNodeRepoTransBlockStageESelect>();
	static Save(
		config: SharingNodeRepoTransBlockStageGraph
	): PropertyDecorator {
		return Dao.BaseSave<SharingNodeRepoTransBlockStageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseSharingNodeRepositoryDao
  extends IDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryGraph, QSharingNodeRepository> {
}

export class BaseSharingNodeRepositoryDao
  extends SQDIDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryGraph, QSharingNodeRepository>
	implements IBaseSharingNodeRepositoryDao {
	
	static Find      = new DaoQueryDecorators<SharingNodeRepositoryESelect>();
	static FindOne   = new DaoQueryDecorators<SharingNodeRepositoryESelect>();
	static Search    = new DaoQueryDecorators<SharingNodeRepositoryESelect>();
	static SearchOne = new DaoQueryDecorators<SharingNodeRepositoryESelect>();
	static Save(
		config: SharingNodeRepositoryGraph
	): PropertyDecorator {
		return Dao.BaseSave<SharingNodeRepositoryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseSharingNodeTerminalDao
  extends IDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalGraph, QSharingNodeTerminal> {
}

export class BaseSharingNodeTerminalDao
  extends SQDIDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalGraph, QSharingNodeTerminal>
	implements IBaseSharingNodeTerminalDao {
	
	static Find      = new DaoQueryDecorators<SharingNodeTerminalESelect>();
	static FindOne   = new DaoQueryDecorators<SharingNodeTerminalESelect>();
	static Search    = new DaoQueryDecorators<SharingNodeTerminalESelect>();
	static SearchOne = new DaoQueryDecorators<SharingNodeTerminalESelect>();
	static Save(
		config: SharingNodeTerminalGraph
	): PropertyDecorator {
		return Dao.BaseSave<SharingNodeTerminalGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseSynchronizationConflictDao
  extends IDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDao
  extends SQDIDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDao {
	
	static Find      = new DaoQueryDecorators<SynchronizationConflictESelect>();
	static FindOne   = new DaoQueryDecorators<SynchronizationConflictESelect>();
	static Search    = new DaoQueryDecorators<SynchronizationConflictESelect>();
	static SearchOne = new DaoQueryDecorators<SynchronizationConflictESelect>();
	static Save(
		config: SynchronizationConflictGraph
	): PropertyDecorator {
		return Dao.BaseSave<SynchronizationConflictGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseSynchronizationConflictPendingNotificationDao
  extends IDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification> {
}

export class BaseSynchronizationConflictPendingNotificationDao
  extends SQDIDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification>
	implements IBaseSynchronizationConflictPendingNotificationDao {
	
	static Find      = new DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>();
	static FindOne   = new DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>();
	static Search    = new DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>();
	static SearchOne = new DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>();
	static Save(
		config: SynchronizationConflictPendingNotificationGraph
	): PropertyDecorator {
		return Dao.BaseSave<SynchronizationConflictPendingNotificationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSynchronizationConflictValuesDao
  extends IDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDao
  extends SQDIDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDao {
	
	static Find      = new DaoQueryDecorators<SynchronizationConflictValuesESelect>();
	static FindOne   = new DaoQueryDecorators<SynchronizationConflictValuesESelect>();
	static Search    = new DaoQueryDecorators<SynchronizationConflictValuesESelect>();
	static SearchOne = new DaoQueryDecorators<SynchronizationConflictValuesESelect>();
	static Save(
		config: SynchronizationConflictValuesGraph
	): PropertyDecorator {
		return Dao.BaseSave<SynchronizationConflictValuesGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
