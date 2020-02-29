import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
import { MissingRecord } from '../ddl/missingRecord/MissingRecord';
import { QMissingRecord } from './missingRecord/qmissingrecord';
import { MissingRecordRepoTransBlock } from '../ddl/missingRecord/MissingRecordRepoTransBlock';
import { QMissingRecordRepoTransBlock } from './missingRecord/qmissingrecordrepotransblock';
import { RecordUpdateStage } from '../ddl/RecordUpdateStage';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { RepoTransBlockResponseStage } from '../ddl/repositoryTransactionBlock/RepoTransBlockResponseStage';
import { QRepoTransBlockResponseStage } from './repositoryTransactionBlock/qrepotransblockresponsestage';
import { RepoTransBlockSchemaToChange } from '../ddl/repositoryTransactionBlock/RepoTransBlockSchemaToChange';
import { QRepoTransBlockSchemaToChange } from './repositoryTransactionBlock/qrepotransblockschematochange';
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
import { SharingNodeRepoTransBlock } from '../ddl/sharingNode/SharingNodeRepoTransBlock';
import { QSharingNodeRepoTransBlock } from './sharingNode/qsharingnoderepotransblock';
import { SharingNodeRepoTransBlockStage } from '../ddl/sharingNode/SharingNodeRepoTransBlockStage';
import { QSharingNodeRepoTransBlockStage } from './sharingNode/qsharingnoderepotransblockstage';
import { SharingNodeRepository } from '../ddl/sharingNode/SharingNodeRepository';
import { QSharingNodeRepository } from './sharingNode/qsharingnoderepository';
import { SharingNodeTerminal } from '../ddl/sharingNode/SharingNodeTerminal';
import { QSharingNodeTerminal } from './sharingNode/qsharingnodeterminal';
import { SynchronizationConflict } from '../ddl/conflict/SynchronizationConflict';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { SynchronizationConflictPendingNotification } from '../ddl/conflict/SynchronizationConflictPendingNotification';
import { QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { SynchronizationConflictValues } from '../ddl/conflict/SynchronizationConflictValues';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	MissingRecord: QMissingRecord;
	MissingRecordRepoTransBlock: QMissingRecordRepoTransBlock;
	RecordUpdateStage: QRecordUpdateStage;
	RepoTransBlockResponseStage: QRepoTransBlockResponseStage;
	RepoTransBlockSchemaToChange: QRepoTransBlockSchemaToChange;
	RepositoryTransactionBlock: QRepositoryTransactionBlock;
	RepositoryTransactionHistoryUpdateStage: QRepositoryTransactionHistoryUpdateStage;
	SharingMessage: QSharingMessage;
	SharingMessageRepoTransBlock: QSharingMessageRepoTransBlock;
	SharingNode: QSharingNode;
	SharingNodeRepoTransBlock: QSharingNodeRepoTransBlock;
	SharingNodeRepoTransBlockStage: QSharingNodeRepoTransBlockStage;
	SharingNodeRepository: QSharingNodeRepository;
	SharingNodeTerminal: QSharingNodeTerminal;
	SynchronizationConflict: QSynchronizationConflict;
	SynchronizationConflictPendingNotification: QSynchronizationConflictPendingNotification;
	SynchronizationConflictValues: QSynchronizationConflictValues;

}

const __constructors__ = {
	MissingRecord: MissingRecord,
	MissingRecordRepoTransBlock: MissingRecordRepoTransBlock,
	RecordUpdateStage: RecordUpdateStage,
	RepoTransBlockResponseStage: RepoTransBlockResponseStage,
	RepoTransBlockSchemaToChange: RepoTransBlockSchemaToChange,
	RepositoryTransactionBlock: RepositoryTransactionBlock,
	RepositoryTransactionHistoryUpdateStage: RepositoryTransactionHistoryUpdateStage,
	SharingMessage: SharingMessage,
	SharingMessageRepoTransBlock: SharingMessageRepoTransBlock,
	SharingNode: SharingNode,
	SharingNodeRepoTransBlock: SharingNodeRepoTransBlock,
	SharingNodeRepoTransBlockStage: SharingNodeRepoTransBlockStage,
	SharingNodeRepository: SharingNodeRepository,
	SharingNodeTerminal: SharingNodeTerminal,
	SynchronizationConflict: SynchronizationConflict,
	SynchronizationConflictPendingNotification: SynchronizationConflictPendingNotification,
	SynchronizationConflictValues: SynchronizationConflictValues
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__,
  domain: 'npmjs.org',
  name: '@airport/moving-walkway'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbSchema__, dbEntityId)
}

DI.db().get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
