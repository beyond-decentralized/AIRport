import {
	Column,
	DbNumber,
	Entity,
	Id,
	Table
}                                  from "@airport/air-control";
import {OneToMany}                 from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {SharingMessage}            from "../sharingMessage/SharingMessage";
import {SharingMechanism}          from "../values/SharingMechanism";
import {SharingNodeProtocol}       from "../values/SharingNodeProtocol";
import {SharingNodeRepoTransBlock} from "./SharingNodeRepoTransBlock";

export type SharingNodeId = number;
export type SharingNodeIsActive = boolean;
export type SharingNodeSyncFrequency = number;
export type SharingNodeURL = string;

@Entity()
@Table({name: "SHARING_NODES"})
export class SharingNode {

	@Id()
	@DbNumber()
	id: SharingNodeId;

	@Column({name: "SHARING_MECHANISM"})
	@DbNumber()
	sharingMechanism: SharingMechanism;

	@Column({name: "IS_ACTIVE"})
	isActive: SharingNodeIsActive;

	@Column({name: "SYNC_FREQUENCY"})
	@DbNumber()
	syncFrequency: SharingNodeSyncFrequency;

	@Column({name: "CONNECTION_PROTOCOL"})
	@DbNumber()
	connectionProtocol: SharingNodeProtocol;

	@Column({name: "CONNECTION_URL"})
	connectionUrl: SharingNodeURL;

	@OneToMany({mappedBy: "sharingNode"})
	messages: SharingMessage[];

	@OneToMany({mappedBy: "sharingNode"})
	sharingNodeRepoTransBlocks: SharingNodeRepoTransBlock[];

}