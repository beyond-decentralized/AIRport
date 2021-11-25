import { SharingMessage } from "../sharingMessage/SharingMessage";
import { SharingMechanism } from "../values/SharingMechanism";
import { SharingNodeProtocol } from "../values/SharingNodeProtocol";
import { SharingNodeRepoTransBlock } from "./SharingNodeRepoTransBlock";
export declare type SharingNode_Id = number;
export declare type SharingNode_IsActive = boolean;
export declare type SharingNode_SyncFrequency = number;
export declare type SharingNode_URL = string;
export declare class SharingNode {
    id: SharingNode_Id;
    sharingMechanism: SharingMechanism;
    isActive: SharingNode_IsActive;
    syncFrequency: SharingNode_SyncFrequency;
    connectionProtocol: SharingNodeProtocol;
    connectionUrl: SharingNode_URL;
    messages: SharingMessage[];
    sharingNodeRepoTransBlocks: SharingNodeRepoTransBlock[];
}
//# sourceMappingURL=SharingNode.d.ts.map