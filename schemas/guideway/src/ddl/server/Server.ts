import {
	Column,
	DbNumber,
	Entity,
	Id,
	OneToMany,
	Table
} from '@airport/air-control'
import {ServerSyncLog} from "./ServerSyncLog";
import {ServerType}    from "./ServerType";

export type ServerId = number;

@Entity()
@Table({name: "AGT_SERVERS"})
export class Server {

	@Id()
	id: ServerId;

	@Column({name: 'SERVER_TYPE', nullable: false})
	@DbNumber()
	serverType: ServerType;

	@OneToMany()
	serverSyncLogs: ServerSyncLog[];
}