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
import { QMissingRecord } from './missingrecord/qmissingrecord';
import { QMissingRecordRepoTransBlock } from './missingrecord/qmissingrecordrepotransblock';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { QRepoTransBlockResponseStage } from './repositorytransactionblock/qrepotransblockresponsestage';
import { QRepoTransBlockSchemaToChange } from './repositorytransactionblock/qrepotransblockschematochange';
import { QRepositoryTransactionBlock } from './repositorytransactionblock/qrepositorytransactionblock';
import { QRepositoryTransactionHistoryUpdateStage } from './repositorytransactionblock/qrepositorytransactionhistoryupdatestage';
import { QSharingMessage } from './sharingmessage/qsharingmessage';
import { QSharingMessageRepoTransBlock } from './sharingmessage/qsharingmessagerepotransblock';
import { QSharingNode } from './sharingnode/qsharingnode';
import { QSharingNodeRepoTransBlock } from './sharingnode/qsharingnoderepotransblock';
import { QSharingNodeRepoTransBlockStage } from './sharingnode/qsharingnoderepotransblockstage';
import { QSharingNodeRepository } from './sharingnode/qsharingnoderepository';
import { QSharingNodeTerminal } from './sharingnode/qsharingnodeterminal';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
import {
  MissingRecord,
  MissingRecordRepoTransBlock,
  RecordUpdateStage,
  RepoTransBlockResponseStage,
  RepoTransBlockSchemaToChange,
  RepositoryTransactionBlock,
  RepositoryTransactionHistoryUpdateStage,
  SharingMessage,
  SharingMessageRepoTransBlock,
  SharingNode,
  SharingNodeRepoTransBlock,
  SharingNodeRepoTransBlockStage,
  SharingNodeRepository,
  SharingNodeTerminal,
  SynchronizationConflict,
  SynchronizationConflictPendingNotification,
  SynchronizationConflictValues
} from '../ddl/ddl';

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
  domain: 'air',
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

DI.db().eventuallyGet(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
