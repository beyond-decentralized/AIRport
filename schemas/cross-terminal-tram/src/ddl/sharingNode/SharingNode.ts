import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	OneToMany,
	Table
}                                  from "@airport/air-control";
import {SharingMessage}            from "../sharingMessage/SharingMessage";
import {SharingMechanism}          from "../values/SharingMechanism";
import {SharingNodeProtocol}       from "../values/SharingNodeProtocol";
import {SharingNodeRepoTransBlock} from "./SharingNodeRepoTransBlock";

export type SharingNode_Id = number;
export type SharingNode_IsActive = boolean;
export type SharingNode_SyncFrequency = number;
export type SharingNode_URL = string;

@Entity()
@Table({name: "SHARING_NODES"})
export class SharingNode {

	@Id()
	@DbNumber()
	id: SharingNode_Id;

	@Column({name: "SHARING_MECHANISM"})
	@DbString()
	sharingMechanism: SharingMechanism;

	@Column({name: "IS_ACTIVE"})
	isActive: SharingNode_IsActive;

	@Column({name: "SYNC_FREQUENCY"})
	@DbNumber()
	syncFrequency: SharingNode_SyncFrequency;

	@Column({name: "CONNECTION_PROTOCOL"})
	@DbString()
	connectionProtocol: SharingNodeProtocol;

	@Column({name: "CONNECTION_URL"})
	connectionUrl: SharingNode_URL;

	@OneToMany({mappedBy: "sharingNode"})
	messages: SharingMessage[];

	@OneToMany({mappedBy: "sharingNode"})
	sharingNodeRepoTransBlocks: SharingNodeRepoTransBlock[];

}