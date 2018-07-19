import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { MissingRecord } from '../ddl/missingRecord/MissingRecord';
import { QMissingRecord } from './missingRecord/qmissingrecord';
import { MissingRecordRepoTransBlock } from '../ddl/missingRecord/MissingRecordRepoTransBlock';
import { QMissingRecordRepoTransBlock } from './missingRecord/qmissingrecordrepotransblock';
import { RecordUpdateStage } from '../ddl/RecordUpdateStage';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { RepoTransBlockResponseStage } from '../ddl/repositoryTransactionBlock/RepoTransBlockResponseStage';
import { QRepoTransBlockResponseStage } from './repositoryTransactionBlock/qrepotransblockresponsestage';
import { RepoTransBlockSchemasToChange } from '../ddl/repositoryTransactionBlock/RepoTransBlockSchemaToChange';
import { QRepoTransBlockSchemasToChange } from './repositoryTransactionBlock/qrepotransblockschematochange';
import { RepositoryTransactionBlock } from '../ddl/repositoryTransactionBlock/RepositoryTransactionBlock';
import { QRepositoryTransactionBlock } from './repositoryTransactionBlock/qrepositorytransactionblock';
import { RepositoryTransactionHistoryUpdateStage } from '../ddl/repositoryTransactionBlock/RepositoryTransactionHistoryUpdateStage';
import { QRepositoryTransactionHistoryUpdateStage } from './repositoryTransactionBlock/qrepositorytransactionhistoryupdatestage';
import { SharingMessage } from '../ddl/sharingMessage/SharingMessage';
import { QSharingMessage } from './sharingMessage/qsharingmessage';
import { SharingMessageRepoTransBlock } from '../ddl/sharingMessage/SharingMessageRepoTransBlock';
import { QSharingMessageRepoTransBlock } from './sharingMessage/qsharingmessagerepotransblock';
import { SharingNode } from '../ddl/sharingNode/SharingNode';
import { QSharingNode } from './sharingNode/qsharingnode';
import { SharingNodeDatabase } from '../ddl/sharingNode/SharingNodeDatabase';
import { QSharingNodeDatabase } from './sharingNode/qsharingnodedatabase';
import { SharingNodeRepoTransBlock } from '../ddl/sharingNode/SharingNodeRepoTransBlock';
import { QSharingNodeRepoTransBlock } from './sharingNode/qsharingnoderepotransblock';
import { SharingNodeRepoTransBlockStage } from '../ddl/sharingNode/SharingNodeRepoTransBlockStage';
import { QSharingNodeRepoTransBlockStage } from './sharingNode/qsharingnoderepotransblockstage';
import { SharingNodeRepository } from '../ddl/sharingNode/SharingNodeRepository';
import { QSharingNodeRepository } from './sharingNode/qsharingnoderepository';
import { SynchronizationConflict } from '../ddl/conflict/SynchronizationConflict';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { SynchronizationConflictPendingNotification } from '../ddl/conflict/SynchronizationConflictPendingNotification';
import { QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { SynchronizationConflictValues } from '../ddl/conflict/SynchronizationConflictValues';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';

import {
	IBaseMissingRecordDmo,
	IBaseMissingRecordRepoTransBlockDmo,
	IBaseRecordUpdateStageDmo,
	IBaseRepoTransBlockResponseStageDmo,
	IBaseRepoTransBlockSchemasToChangeDmo,
	IBaseRepositoryTransactionBlockDmo,
	IBaseRepositoryTransactionHistoryUpdateStageDmo,
	IBaseSharingMessageDmo,
	IBaseSharingMessageRepoTransBlockDmo,
	IBaseSharingNodeDmo,
	IBaseSharingNodeDatabaseDmo,
	IBaseSharingNodeRepoTransBlockDmo,
	IBaseSharingNodeRepoTransBlockStageDmo,
	IBaseSharingNodeRepositoryDmo,
	IBaseSynchronizationConflictDmo,
	IBaseSynchronizationConflictPendingNotificationDmo,
	IBaseSynchronizationConflictValuesDmo
} from './baseDmos';

import {
	IBaseMissingRecordDao,
	IBaseMissingRecordRepoTransBlockDao,
	IBaseRecordUpdateStageDao,
	IBaseRepoTransBlockResponseStageDao,
	IBaseRepoTransBlockSchemasToChangeDao,
	IBaseRepositoryTransactionBlockDao,
	IBaseRepositoryTransactionHistoryUpdateStageDao,
	IBaseSharingMessageDao,
	IBaseSharingMessageRepoTransBlockDao,
	IBaseSharingNodeDao,
	IBaseSharingNodeDatabaseDao,
	IBaseSharingNodeRepoTransBlockDao,
	IBaseSharingNodeRepoTransBlockStageDao,
	IBaseSharingNodeRepositoryDao,
	IBaseSynchronizationConflictDao,
	IBaseSynchronizationConflictPendingNotificationDao,
	IBaseSynchronizationConflictValuesDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		MissingRecord: IBaseMissingRecordDmo;
		MissingRecordRepoTransBlock: IBaseMissingRecordRepoTransBlockDmo;
		RecordUpdateStage: IBaseRecordUpdateStageDmo;
		RepoTransBlockResponseStage: IBaseRepoTransBlockResponseStageDmo;
		RepoTransBlockSchemasToChange: IBaseRepoTransBlockSchemasToChangeDmo;
		RepositoryTransactionBlock: IBaseRepositoryTransactionBlockDmo;
		RepositoryTransactionHistoryUpdateStage: IBaseRepositoryTransactionHistoryUpdateStageDmo;
		SharingMessage: IBaseSharingMessageDmo;
		SharingMessageRepoTransBlock: IBaseSharingMessageRepoTransBlockDmo;
		SharingNode: IBaseSharingNodeDmo;
		SharingNodeDatabase: IBaseSharingNodeDatabaseDmo;
		SharingNodeRepoTransBlock: IBaseSharingNodeRepoTransBlockDmo;
		SharingNodeRepoTransBlockStage: IBaseSharingNodeRepoTransBlockStageDmo;
		SharingNodeRepository: IBaseSharingNodeRepositoryDmo;
		SynchronizationConflict: IBaseSynchronizationConflictDmo;
		SynchronizationConflictPendingNotification: IBaseSynchronizationConflictPendingNotificationDmo;
		SynchronizationConflictValues: IBaseSynchronizationConflictValuesDmo;
	}

	dao: {
		MissingRecord: IBaseMissingRecordDao;
		MissingRecordRepoTransBlock: IBaseMissingRecordRepoTransBlockDao;
		RecordUpdateStage: IBaseRecordUpdateStageDao;
		RepoTransBlockResponseStage: IBaseRepoTransBlockResponseStageDao;
		RepoTransBlockSchemasToChange: IBaseRepoTransBlockSchemasToChangeDao;
		RepositoryTransactionBlock: IBaseRepositoryTransactionBlockDao;
		RepositoryTransactionHistoryUpdateStage: IBaseRepositoryTransactionHistoryUpdateStageDao;
		SharingMessage: IBaseSharingMessageDao;
		SharingMessageRepoTransBlock: IBaseSharingMessageRepoTransBlockDao;
		SharingNode: IBaseSharingNodeDao;
		SharingNodeDatabase: IBaseSharingNodeDatabaseDao;
		SharingNodeRepoTransBlock: IBaseSharingNodeRepoTransBlockDao;
		SharingNodeRepoTransBlockStage: IBaseSharingNodeRepoTransBlockStageDao;
		SharingNodeRepository: IBaseSharingNodeRepositoryDao;
		SynchronizationConflict: IBaseSynchronizationConflictDao;
		SynchronizationConflictPendingNotification: IBaseSynchronizationConflictPendingNotificationDao;
		SynchronizationConflictValues: IBaseSynchronizationConflictValuesDao;
	}
	
	MissingRecord: QMissingRecord;
	MissingRecordRepoTransBlock: QMissingRecordRepoTransBlock;
	RecordUpdateStage: QRecordUpdateStage;
	RepoTransBlockResponseStage: QRepoTransBlockResponseStage;
	RepoTransBlockSchemasToChange: QRepoTransBlockSchemasToChange;
	RepositoryTransactionBlock: QRepositoryTransactionBlock;
	RepositoryTransactionHistoryUpdateStage: QRepositoryTransactionHistoryUpdateStage;
	SharingMessage: QSharingMessage;
	SharingMessageRepoTransBlock: QSharingMessageRepoTransBlock;
	SharingNode: QSharingNode;
	SharingNodeDatabase: QSharingNodeDatabase;
	SharingNodeRepoTransBlock: QSharingNodeRepoTransBlock;
	SharingNodeRepoTransBlockStage: QSharingNodeRepoTransBlockStage;
	SharingNodeRepository: QSharingNodeRepository;
	SynchronizationConflict: QSynchronizationConflict;
	SynchronizationConflictPendingNotification: QSynchronizationConflictPendingNotification;
	SynchronizationConflictValues: QSynchronizationConflictValues;

}

const __constructors__ = {
	MissingRecord: MissingRecord,
	MissingRecordRepoTransBlock: MissingRecordRepoTransBlock,
	RecordUpdateStage: RecordUpdateStage,
	RepoTransBlockResponseStage: RepoTransBlockResponseStage,
	RepoTransBlockSchemasToChange: RepoTransBlockSchemasToChange,
	RepositoryTransactionBlock: RepositoryTransactionBlock,
	RepositoryTransactionHistoryUpdateStage: RepositoryTransactionHistoryUpdateStage,
	SharingMessage: SharingMessage,
	SharingMessageRepoTransBlock: SharingMessageRepoTransBlock,
	SharingNode: SharingNode,
	SharingNodeDatabase: SharingNodeDatabase,
	SharingNodeRepoTransBlock: SharingNodeRepoTransBlock,
	SharingNodeRepoTransBlockStage: SharingNodeRepoTransBlockStage,
	SharingNodeRepository: SharingNodeRepository,
	SynchronizationConflict: SynchronizationConflict,
	SynchronizationConflictPendingNotification: SynchronizationConflictPendingNotification,
	SynchronizationConflictValues: SynchronizationConflictValues
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
