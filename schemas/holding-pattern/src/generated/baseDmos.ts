import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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


export interface IBaseActorDmo
  extends IDmo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> {
}

export class BaseActorDmo
  extends Dmo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor>
	implements IBaseActorDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Actor']);
	}
}


export interface IBaseActorApplicationDmo
  extends IDmo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}

export class BaseActorApplicationDmo
  extends Dmo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication>
	implements IBaseActorApplicationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ActorApplication']);
	}
}


export interface IBaseApplicationDmo
  extends IDmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}

export class BaseApplicationDmo
  extends Dmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication>
	implements IBaseApplicationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Application']);
	}
}


export interface IBaseChildRepoRowDmo
  extends IDmo<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> {
}

export class BaseChildRepoRowDmo
  extends Dmo<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow>
	implements IBaseChildRepoRowDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ChildRepoRow']);
	}
}


export interface IBaseChildRowDmo
  extends IDmo<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow> {
}

export class BaseChildRowDmo
  extends Dmo<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow>
	implements IBaseChildRowDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ChildRow']);
	}
}


export interface IBaseImmutableRepoRowDmo
  extends IDmo<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> {
}

export class BaseImmutableRepoRowDmo
  extends Dmo<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow>
	implements IBaseImmutableRepoRowDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ImmutableRepoRow']);
	}
}


export interface IBaseImmutableRowDmo
  extends IDmo<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> {
}

export class BaseImmutableRowDmo
  extends Dmo<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow>
	implements IBaseImmutableRowDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ImmutableRow']);
	}
}


export interface IBaseMutableRepoRowDmo
  extends IDmo<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> {
}

export class BaseMutableRepoRowDmo
  extends Dmo<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow>
	implements IBaseMutableRepoRowDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MutableRepoRow']);
	}
}


export interface IBaseMutableRowDmo
  extends IDmo<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> {
}

export class BaseMutableRowDmo
  extends Dmo<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow>
	implements IBaseMutableRowDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MutableRow']);
	}
}


export interface IBaseOperationHistoryDmo
  extends IDmo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}

export class BaseOperationHistoryDmo
  extends Dmo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory>
	implements IBaseOperationHistoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['OperationHistory']);
	}
}


export interface IBaseRecordHistoryDmo
  extends IDmo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}

export class BaseRecordHistoryDmo
  extends Dmo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory>
	implements IBaseRecordHistoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistory']);
	}
}


export interface IBaseRecordHistoryNewValueDmo
  extends IDmo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDmo
  extends Dmo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistoryNewValue']);
	}
}


export interface IBaseRecordHistoryOldValueDmo
  extends IDmo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDmo
  extends Dmo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistoryOldValue']);
	}
}


export interface IBaseReferenceRowDmo
  extends IDmo<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> {
}

export class BaseReferenceRowDmo
  extends Dmo<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow>
	implements IBaseReferenceRowDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ReferenceRow']);
	}
}


export interface IBaseRepoTransHistoryChangedRepositoryActorDmo
  extends IDmo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}

export class BaseRepoTransHistoryChangedRepositoryActorDmo
  extends Dmo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor>
	implements IBaseRepoTransHistoryChangedRepositoryActorDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepoTransHistoryChangedRepositoryActor']);
	}
}


export interface IBaseRepositoryDmo
  extends IDmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}

export class BaseRepositoryDmo
  extends Dmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository>
	implements IBaseRepositoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Repository']);
	}
}


export interface IBaseRepositoryActorDmo
  extends IDmo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}

export class BaseRepositoryActorDmo
  extends Dmo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor>
	implements IBaseRepositoryActorDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryActor']);
	}
}


export interface IBaseRepositoryApplicationDmo
  extends IDmo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDmo
  extends Dmo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication>
	implements IBaseRepositoryApplicationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryApplication']);
	}
}


export interface IBaseRepositoryEntityDmo
  extends IDmo<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> {
}

export class BaseRepositoryEntityDmo
  extends Dmo<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity>
	implements IBaseRepositoryEntityDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryEntity']);
	}
}


export interface IBaseRepositorySchemaDmo
  extends IDmo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}

export class BaseRepositorySchemaDmo
  extends Dmo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema>
	implements IBaseRepositorySchemaDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositorySchema']);
	}
}


export interface IBaseRepositoryTransactionHistoryDmo
  extends IDmo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDmo
  extends Dmo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryTransactionHistory']);
	}
}


export interface IBaseStageableDmo
  extends IDmo<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable> {
}

export class BaseStageableDmo
  extends Dmo<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable>
	implements IBaseStageableDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Stageable']);
	}
}


export interface IBaseTransactionHistoryDmo
  extends IDmo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}

export class BaseTransactionHistoryDmo
  extends Dmo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory>
	implements IBaseTransactionHistoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TransactionHistory']);
	}
}
