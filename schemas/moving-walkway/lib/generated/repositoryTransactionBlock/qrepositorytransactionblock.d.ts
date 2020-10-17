import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '@airport/travel-document-checkpoint';
import { RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation, RepositoryTransactionHistoryECascadeGraph, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistory } from '@airport/holding-pattern';
import { SharingNodeRepoTransBlockECascadeGraph, SharingNodeRepoTransBlockESelect, QSharingNodeRepoTransBlock } from '../sharingNode/qsharingnoderepotransblock';
import { SharingMessageRepoTransBlockECascadeGraph, SharingMessageRepoTransBlockESelect, QSharingMessageRepoTransBlock } from '../sharingMessage/qsharingmessagerepotransblock';
import { MissingRecordRepoTransBlockECascadeGraph, MissingRecordRepoTransBlockESelect, QMissingRecordRepoTransBlock } from '../missingRecord/qmissingrecordrepotransblock';
import { RepoTransBlockSchemaToChangeECascadeGraph, RepoTransBlockSchemaToChangeESelect, QRepoTransBlockSchemaToChange } from './qrepotransblockschematochange';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionBlockESelect extends IEntitySelectProperties, RepositoryTransactionBlockEOptionalId {
    sourceId?: number | IQNumberField;
    hash?: string | IQStringField;
    syncOutcomeType?: number | IQNumberField;
    contents?: string | IQStringField;
    source?: TerminalESelect;
    repository?: RepositoryESelect;
    repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
    sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockESelect;
    sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockESelect;
    missingRecordRepoTransBlocks?: MissingRecordRepoTransBlockESelect;
    repoTransBlockSchemasToChange?: RepoTransBlockSchemaToChangeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionBlockEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionBlockEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionBlockEUpdateProperties extends IEntityUpdateProperties {
    sourceId?: number | IQNumberField;
    hash?: string | IQStringField;
    syncOutcomeType?: number | IQNumberField;
    contents?: string | IQStringField;
    source?: TerminalEOptionalId;
    repository?: RepositoryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTransactionBlockECascadeGraph extends IEntityCascadeGraph {
    repositoryTransactionHistory?: RepositoryTransactionHistoryECascadeGraph;
    sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockECascadeGraph;
    sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockECascadeGraph;
    missingRecordRepoTransBlocks?: MissingRecordRepoTransBlockECascadeGraph;
    repoTransBlockSchemasToChange?: RepoTransBlockSchemaToChangeECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionBlockEUpdateColumns extends IEntityUpdateColumns {
    SOURCE_ID?: number | IQNumberField;
    HASH?: string | IQStringField;
    SYNC_OUTCOME_TYPE?: number | IQNumberField;
    CONTENTS?: string | IQStringField;
    SOURCE_TERMINAL_ID?: number | IQNumberField;
    REPOSITORY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTransactionBlockECreateProperties extends Partial<RepositoryTransactionBlockEId>, RepositoryTransactionBlockEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTransactionBlockECreateColumns extends RepositoryTransactionBlockEId, RepositoryTransactionBlockEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryTransactionBlock extends IQEntity {
    id: IQNumberField;
    sourceId: IQNumberField;
    hash: IQStringField;
    syncOutcomeType: IQNumberField;
    contents: IQStringField;
    source: QTerminalQRelation;
    repository: QRepositoryQRelation;
    repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;
    sharingNodeRepoTransBlocks: IQOneToManyRelation<QSharingNodeRepoTransBlock>;
    sharingMessageRepoTransBlocks: IQOneToManyRelation<QSharingMessageRepoTransBlock>;
    missingRecordRepoTransBlocks: IQOneToManyRelation<QMissingRecordRepoTransBlock>;
    repoTransBlockSchemasToChange: IQOneToManyRelation<QRepoTransBlockSchemaToChange>;
}
export interface QRepositoryTransactionBlockQId {
    id: IQNumberField;
}
export interface QRepositoryTransactionBlockQRelation extends IQRelation<QRepositoryTransactionBlock>, QRepositoryTransactionBlockQId {
}
//# sourceMappingURL=qrepositorytransactionblock.d.ts.map