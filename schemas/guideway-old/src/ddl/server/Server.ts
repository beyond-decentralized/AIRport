import {DbNumber, Entity, Id, OneToMany, Table} from "@airport/air-control";
import { ShardedRecord } from "../ShardedRecord";
import {ServerSyncLog} from "./ServerSyncLog";
import {ServerType} from "./ServerType";

export type ServerId = number;

@Entity()
@Table({name: "SERVERS"})
export class Server extends ShardedRecord {

	@Id()
	@DbNumber()
	id: ServerId;

	@DbNumber()
	serverType: ServerType;

	@OneToMany()
	serverSyncLogs: ServerSyncLog[];
}