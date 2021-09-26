import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { SharingMessageGraph, SharingMessageESelect, QSharingMessage } from '../sharingMessage/qsharingmessage';
import { SharingMessage } from '../../ddl/sharingMessage/SharingMessage';
import { SharingNodeRepoTransBlockGraph, SharingNodeRepoTransBlockESelect, QSharingNodeRepoTransBlock } from './qsharingnoderepotransblock';
import { SharingNodeRepoTransBlock } from '../../ddl/sharingNode/SharingNodeRepoTransBlock';
import { SharingNode } from '../../ddl/sharingNode/SharingNode';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeESelect extends IEntitySelectProperties, SharingNodeEOptionalId {
    sharingMechanism?: string | IQStringField;
    isActive?: boolean | IQBooleanField;
    syncFrequency?: number | IQNumberField;
    connectionProtocol?: string | IQStringField;
    connectionUrl?: string | IQStringField;
    messages?: SharingMessageESelect;
    sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeEUpdateProperties extends IEntityUpdateProperties {
    sharingMechanism?: string | IQStringField;
    isActive?: boolean | IQBooleanField;
    syncFrequency?: number | IQNumberField;
    connectionProtocol?: string | IQStringField;
    connectionUrl?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SharingNodeGraph extends SharingNodeEOptionalId, IEntityCascadeGraph {
    sharingMechanism?: string | IQStringField;
    isActive?: boolean | IQBooleanField;
    syncFrequency?: number | IQNumberField;
    connectionProtocol?: string | IQStringField;
    connectionUrl?: string | IQStringField;
    messages?: SharingMessageGraph[];
    sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeEUpdateColumns extends IEntityUpdateColumns {
    SHARING_MECHANISM?: string | IQStringField;
    IS_ACTIVE?: boolean | IQBooleanField;
    SYNC_FREQUENCY?: number | IQNumberField;
    CONNECTION_PROTOCOL?: string | IQStringField;
    CONNECTION_URL?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeECreateProperties extends Partial<SharingNodeEId>, SharingNodeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeECreateColumns extends SharingNodeEId, SharingNodeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNode extends IQEntity<SharingNode> {
    id: IQNumberField;
    sharingMechanism: IQStringField;
    isActive: IQBooleanField;
    syncFrequency: IQNumberField;
    connectionProtocol: IQStringField;
    connectionUrl: IQStringField;
    messages: IQOneToManyRelation<SharingMessage, QSharingMessage>;
    sharingNodeRepoTransBlocks: IQOneToManyRelation<SharingNodeRepoTransBlock, QSharingNodeRepoTransBlock>;
}
export interface QSharingNodeQId {
    id: IQNumberField;
}
export interface QSharingNodeQRelation extends IQRelation<SharingNode, QSharingNode>, QSharingNodeQId {
}
//# sourceMappingURL=qsharingnode.d.ts.map