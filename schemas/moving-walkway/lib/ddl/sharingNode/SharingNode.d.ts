import { SharingMessage } from "../sharingMessage/SharingMessage";
import { SharingMechanism } from "../values/SharingMechanism";
import { SharingNodeProtocol } from "../values/SharingNodeProtocol";
import { SharingNodeRepoTransBlock } from "./SharingNodeRepoTransBlock";
export declare type SharingNodeId = number;
export declare type SharingNodeIsActive = boolean;
export declare type SharingNodeSyncFrequency = number;
export declare type SharingNodeURL = string;
export declare class SharingNode {
    id: SharingNodeId;
    sharingMechanism: SharingMechanism;
    isActive: SharingNodeIsActive;
    syncFrequency: SharingNodeSyncFrequency;
    connectionProtocol: SharingNodeProtocol;
    connectionUrl: SharingNodeURL;
    messages: SharingMessage[];
    sharingNodeRepoTransBlocks: SharingNodeRepoTransBlock[];
}
//# sourceMappingURL=SharingNode.d.ts.map