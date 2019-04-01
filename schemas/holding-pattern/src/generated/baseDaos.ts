import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
import {
	IActor,
	ActorESelect,
	ActorECreateColumns,
	ActorECreateProperties,
	ActorEUpdateColumns,
	ActorEUpdateProperties,
	ActorEId,
	QActor
} from './infrastructure/qactor';
import {
	IActorApplication,
	ActorApplicationESelect,
	ActorApplicationECreateColumns,
	ActorApplicationECreateProperties,
	ActorApplicationEUpdateColumns,
	ActorApplicationEUpdateProperties,
	ActorApplicationEId,
	QActorApplication
} from './infrastructure/qactorapplication';
import {
	IApplication,
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	QApplication
} from './infrastructure/qapplication';
import {
	IChildRepoRow,
	ChildRepoRowESelect,
	ChildRepoRowECreateColumns,
	ChildRepoRowECreateProperties,
	ChildRepoRowEUpdateColumns,
	ChildRepoRowEUpdateProperties,
	ChildRepoRowEId,
	QChildRepoRow
} from './traditional/qchildreporow';
import {
	IChildRow,
	ChildRowESelect,
	ChildRowECreateColumns,
	ChildRowECreateProperties,
	ChildRowEUpdateColumns,
	ChildRowEUpdateProperties,
	ChildRowEId,
	QChildRow
} from './traditional/qchildrow';
import {
	IImmutableRepoRow,
	ImmutableRepoRowESelect,
	ImmutableRepoRowECreateColumns,
	ImmutableRepoRowECreateProperties,
	ImmutableRepoRowEUpdateColumns,
	ImmutableRepoRowEUpdateProperties,
	ImmutableRepoRowEId,
	QImmutableRepoRow
} from './traditional/qimmutablereporow';
import {
	IImmutableRow,
	ImmutableRowESelect,
	ImmutableRowECreateColumns,
	ImmutableRowECreateProperties,
	ImmutableRowEUpdateColumns,
	ImmutableRowEUpdateProperties,
	ImmutableRowEId,
	QImmutableRow
} from './traditional/qimmutablerow';
import {
	IMutableRepoRow,
	MutableRepoRowESelect,
	MutableRepoRowECreateColumns,
	MutableRepoRowECreateProperties,
	MutableRepoRowEUpdateColumns,
	MutableRepoRowEUpdateProperties,
	MutableRepoRowEId,
	QMutableRepoRow
} from './traditional/qmutablereporow';
import {
	IMutableRow,
	MutableRowESelect,
	MutableRowECreateColumns,
	MutableRowECreateProperties,
	MutableRowEUpdateColumns,
	MutableRowEUpdateProperties,
	MutableRowEId,
	QMutableRow
} from './traditional/qmutablerow';
import {
	IOperationHistory,
	OperationHistoryESelect,
	OperationHistoryECreateColumns,
	OperationHistoryECreateProperties,
	OperationHistoryEUpdateColumns,
	OperationHistoryEUpdateProperties,
	OperationHistoryEId,
	QOperationHistory
} from './history/qoperationhistory';
import {
	IRecordHistory,
	RecordHistoryESelect,
	RecordHistoryECreateColumns,
	RecordHistoryECreateProperties,
	RecordHistoryEUpdateColumns,
	RecordHistoryEUpdateProperties,
	RecordHistoryEId,
	QRecordHistory
} from './history/qrecordhistory';
import {
	IRecordHistoryNewValue,
	RecordHistoryNewValueESelect,
	RecordHistoryNewValueECreateColumns,
	RecordHistoryNewValueECreateProperties,
	RecordHistoryNewValueEUpdateColumns,
	RecordHistoryNewValueEUpdateProperties,
	RecordHistoryNewValueEId,
	QRecordHistoryNewValue
} from './history/qrecordhistorynewvalue';
import {
	IRecordHistoryOldValue,
	RecordHistoryOldValueESelect,
	RecordHistoryOldValueECreateColumns,
	RecordHistoryOldValueECreateProperties,
	RecordHistoryOldValueEUpdateColumns,
	RecordHistoryOldValueEUpdateProperties,
	RecordHistoryOldValueEId,
	QRecordHistoryOldValue
} from './history/qrecordhistoryoldvalue';
import {
	IReferenceRow,
	ReferenceRowESelect,
	ReferenceRowECreateColumns,
	ReferenceRowECreateProperties,
	ReferenceRowEUpdateColumns,
	ReferenceRowEUpdateProperties,
	ReferenceRowEId,
	QReferenceRow
} from './traditional/qreferencerow';
import {
	IRepoTransHistoryChangedRepositoryActor,
	RepoTransHistoryChangedRepositoryActorESelect,
	RepoTransHistoryChangedRepositoryActorECreateColumns,
	RepoTransHistoryChangedRepositoryActorECreateProperties,
	RepoTransHistoryChangedRepositoryActorEUpdateColumns,
	RepoTransHistoryChangedRepositoryActorEUpdateProperties,
	RepoTransHistoryChangedRepositoryActorEId,
	QRepoTransHistoryChangedRepositoryActor
} from './history/qrepotranshistorychangedrepositoryactor';
import {
	IRepository,
	RepositoryESelect,
	RepositoryECreateColumns,
	RepositoryECreateProperties,
	RepositoryEUpdateColumns,
	RepositoryEUpdateProperties,
	RepositoryEId,
	QRepository
} from './repository/qrepository';
import {
	IRepositoryActor,
	RepositoryActorESelect,
	RepositoryActorECreateColumns,
	RepositoryActorECreateProperties,
	RepositoryActorEUpdateColumns,
	RepositoryActorEUpdateProperties,
	RepositoryActorEId,
	QRepositoryActor
} from './repository/qrepositoryactor';
import {
	IRepositoryApplication,
	RepositoryApplicationESelect,
	RepositoryApplicationECreateColumns,
	RepositoryApplicationECreateProperties,
	RepositoryApplicationEUpdateColumns,
	RepositoryApplicationEUpdateProperties,
	RepositoryApplicationEId,
	QRepositoryApplication
} from './repository/qrepositoryapplication';
import {
	IRepositoryEntity,
	RepositoryEntityESelect,
	RepositoryEntityECreateColumns,
	RepositoryEntityECreateProperties,
	RepositoryEntityEUpdateColumns,
	RepositoryEntityEUpdateProperties,
	RepositoryEntityEId,
	QRepositoryEntity
} from './repository/qrepositoryentity';
import {
	IRepositorySchema,
	RepositorySchemaESelect,
	RepositorySchemaECreateColumns,
	RepositorySchemaECreateProperties,
	RepositorySchemaEUpdateColumns,
	RepositorySchemaEUpdateProperties,
	RepositorySchemaEId,
	QRepositorySchema
} from './repository/qrepositoryschema';
import {
	IRepositoryTransactionHistory,
	RepositoryTransactionHistoryESelect,
	RepositoryTransactionHistoryECreateColumns,
	RepositoryTransactionHistoryECreateProperties,
	RepositoryTransactionHistoryEUpdateColumns,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryEId,
	QRepositoryTransactionHistory
} from './history/qrepositorytransactionhistory';
import {
	IStageable,
	StageableESelect,
	StageableECreateColumns,
	StageableECreateProperties,
	StageableEUpdateColumns,
	StageableEUpdateProperties,
	StageableEId,
	QStageable
} from './infrastructure/qstageable';
import {
	ITransactionHistory,
	TransactionHistoryESelect,
	TransactionHistoryECreateColumns,
	TransactionHistoryECreateProperties,
	TransactionHistoryEUpdateColumns,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryEId,
	QTransactionHistory
} from './history/qtransactionhistory';


export interface IBaseActorDao
  extends IDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, QActor> {
}

export class BaseActorDao
  extends Dao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, QActor>
	implements IBaseActorDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Actor'], Q)
	}
}


export interface IBaseActorApplicationDao
  extends IDao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}

export class BaseActorApplicationDao
  extends Dao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication>
	implements IBaseActorApplicationDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ActorApplication'], Q)
	}
}


export interface IBaseApplicationDao
  extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}

export class BaseApplicationDao
  extends Dao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication>
	implements IBaseApplicationDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Application'], Q)
	}
}


export interface IBaseChildRepoRowDao
  extends IDao<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateColumns, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> {
}

export class BaseChildRepoRowDao
  extends Dao<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateColumns, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow>
	implements IBaseChildRepoRowDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ChildRepoRow'], Q)
	}
}


export interface IBaseChildRowDao
  extends IDao<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateColumns, ChildRowEUpdateProperties, ChildRowEId, QChildRow> {
}

export class BaseChildRowDao
  extends Dao<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateColumns, ChildRowEUpdateProperties, ChildRowEId, QChildRow>
	implements IBaseChildRowDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ChildRow'], Q)
	}
}


export interface IBaseImmutableRepoRowDao
  extends IDao<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateColumns, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> {
}

export class BaseImmutableRepoRowDao
  extends Dao<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateColumns, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow>
	implements IBaseImmutableRepoRowDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ImmutableRepoRow'], Q)
	}
}


export interface IBaseImmutableRowDao
  extends IDao<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateColumns, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> {
}

export class BaseImmutableRowDao
  extends Dao<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateColumns, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow>
	implements IBaseImmutableRowDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ImmutableRow'], Q)
	}
}


export interface IBaseMutableRepoRowDao
  extends IDao<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateColumns, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> {
}

export class BaseMutableRepoRowDao
  extends Dao<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateColumns, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow>
	implements IBaseMutableRepoRowDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MutableRepoRow'], Q)
	}
}


export interface IBaseMutableRowDao
  extends IDao<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateColumns, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> {
}

export class BaseMutableRowDao
  extends Dao<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateColumns, MutableRowEUpdateProperties, MutableRowEId, QMutableRow>
	implements IBaseMutableRowDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MutableRow'], Q)
	}
}


export interface IBaseOperationHistoryDao
  extends IDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}

export class BaseOperationHistoryDao
  extends Dao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory>
	implements IBaseOperationHistoryDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['OperationHistory'], Q)
	}
}


export interface IBaseRecordHistoryDao
  extends IDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}

export class BaseRecordHistoryDao
  extends Dao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory>
	implements IBaseRecordHistoryDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistory'], Q)
	}
}


export interface IBaseRecordHistoryNewValueDao
  extends IDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDao
  extends Dao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistoryNewValue'], Q)
	}
}


export interface IBaseRecordHistoryOldValueDao
  extends IDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDao
  extends Dao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistoryOldValue'], Q)
	}
}


export interface IBaseReferenceRowDao
  extends IDao<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateColumns, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> {
}

export class BaseReferenceRowDao
  extends Dao<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateColumns, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow>
	implements IBaseReferenceRowDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ReferenceRow'], Q)
	}
}


export interface IBaseRepoTransHistoryChangedRepositoryActorDao
  extends IDao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}

export class BaseRepoTransHistoryChangedRepositoryActorDao
  extends Dao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor>
	implements IBaseRepoTransHistoryChangedRepositoryActorDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepoTransHistoryChangedRepositoryActor'], Q)
	}
}


export interface IBaseRepositoryDao
  extends IDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}

export class BaseRepositoryDao
  extends Dao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, QRepository>
	implements IBaseRepositoryDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Repository'], Q)
	}
}


export interface IBaseRepositoryActorDao
  extends IDao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}

export class BaseRepositoryActorDao
  extends Dao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor>
	implements IBaseRepositoryActorDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryActor'], Q)
	}
}


export interface IBaseRepositoryApplicationDao
  extends IDao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDao
  extends Dao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication>
	implements IBaseRepositoryApplicationDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryApplication'], Q)
	}
}


export interface IBaseRepositoryEntityDao
  extends IDao<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> {
}

export class BaseRepositoryEntityDao
  extends Dao<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity>
	implements IBaseRepositoryEntityDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryEntity'], Q)
	}
}


export interface IBaseRepositorySchemaDao
  extends IDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}

export class BaseRepositorySchemaDao
  extends Dao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema>
	implements IBaseRepositorySchemaDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositorySchema'], Q)
	}
}


export interface IBaseRepositoryTransactionHistoryDao
  extends IDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDao
  extends Dao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryTransactionHistory'], Q)
	}
}


export interface IBaseStageableDao
  extends IDao<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateColumns, StageableEUpdateProperties, StageableEId, QStageable> {
}

export class BaseStageableDao
  extends Dao<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateColumns, StageableEUpdateProperties, StageableEId, QStageable>
	implements IBaseStageableDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Stageable'], Q)
	}
}


export interface IBaseTransactionHistoryDao
  extends IDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}

export class BaseTransactionHistoryDao
  extends Dao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory>
	implements IBaseTransactionHistoryDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TransactionHistory'], Q)
	}
}
