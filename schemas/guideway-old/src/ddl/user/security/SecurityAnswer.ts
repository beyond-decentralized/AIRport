import { Entity, Id, JoinColumns, ManyToOne, Table } from "@airport/air-control";
import { ShardedRecord } from "../../ShardedRecord";
import { User } from "../User";
import { SecurityQuestion } from "./SecurityQuestion";

@Entity()
@Table({name: "SECURITY_ANSWERS"})
export class SecurityAnswer extends ShardedRecord {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: "USER_ID", referencedColumnName: "ID"}
	])
	user: User;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: "SECURITY_QUESTION_ID", referencedColumnName: "ID"}
	])
	securityQuestion: SecurityQuestion;

	answer: string;

}