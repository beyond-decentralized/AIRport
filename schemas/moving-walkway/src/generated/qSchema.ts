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
import { MissingRecord } from '../ddl/missingrecord/missingrecord';
import { QMissingRecord } from './missingrecord/qmissingrecord';
import { MissingRecordRepoTransBlock } from '../ddl/missingrecord/missingrecordrepotransblock';
import { QMissingRecordRepoTransBlock } from './missingrecord/qmissingrecordrepotransblock';
import { RecordUpdateStage } from '../ddl/recordupdatestage';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { RepoTransBlockResponseStage } from '../ddl/repositorytransactionblock/repotransblockresponsestage';
import { QRepoTransBlockResponseStage } from './repositorytransactionblock/qrepotransblockresponsestage';
import { RepoTransBlockSchemaToChange } from '../ddl/repositorytransactionblock/repotransblockschematochange';
import { QRepoTransBlockSchemaToChange } from './repositorytransactionblock/qrepotransblockschematochange';
import { RepositoryTransactionBlock } from '../ddl/repositorytransactionblock/repositorytransactionblock';
import { QRepositoryTransactionBlock } from './repositorytransactionblock/qrepositorytransactionblock';
import { RepositoryTransactionHistoryUpdateStage } from '../ddl/repositorytransactionblock/repositorytransactionhistoryupdatestage';
import { QRepositoryTransactionHistoryUpdateStage } from './repositorytransactionblock/qrepositorytransactionhistoryupdatestage';
import { SharingMessage } from '../ddl/sharingmessage/sharingmessage';
import { QSharingMessage } from './sharingmessage/qsharingmessage';
import { SharingMessageRepoTransBlock } from '../ddl/sharingmessage/sharingmessagerepotransblock';
import { QSharingMessageRepoTransBlock } from './sharingmessage/qsharingmessagerepotransblock';
import { SharingNode } from '../ddl/sharingnode/sharingnode';
import { QSharingNode } from './sharingnode/qsharingnode';
import { SharingNodeRepoTransBlock } from '../ddl/sharingnode/sharingnoderepotransblock';
import { QSharingNodeRepoTransBlock } from './sharingnode/qsharingnoderepotransblock';
import { SharingNodeRepoTransBlockStage } from '../ddl/sharingnode/sharingnoderepotransblockstage';
import { QSharingNodeRepoTransBlockStage } from './sharingnode/qsharingnoderepotransblockstage';
import { SharingNodeRepository } from '../ddl/sharingnode/sharingnoderepository';
import { QSharingNodeRepository } from './sharingnode/qsharingnoderepository';
import { SharingNodeTerminal } from '../ddl/sharingnode/sharingnodeterminal';
import { QSharingNodeTerminal } from './sharingnode/qsharingnodeterminal';
import { SynchronizationConflict } from '../ddl/conflict/synchronizationconflict';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { SynchronizationConflictPendingNotification } from '../ddl/conflict/synchronizationconflictpendingnotification';
import { QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { SynchronizationConflictValues } from '../ddl/conflict/synchronizationconflictvalues';
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

DI.get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
