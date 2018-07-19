import {
	Column,
	DbBoolean,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne
}                   from "@airport/air-control";
import {IDatabase,} from "../../generated/infrastructure/qdatabase";
import {IUser}      from "../../generated/infrastructure/quser";

export type DatabaseId = number;
export type DatabaseIsLocal = boolean;
export type DatabaseName = string;
export type DatabaseSecondId = number;

@Entity()
export class Database
	implements IDatabase {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: DatabaseId;

	@DbString()
	name: DatabaseName;

	@Column({name: "SECOND_ID"})
	@DbNumber()
	secondId: DatabaseSecondId;

	@ManyToOne()
	@JoinColumn({name: "OWNER_USER_ID", referencedColumnName: "ID"})
	owner: IUser;

	@Column({name: "IS_LOCAL"})
	@DbBoolean()
	isLocal: DatabaseIsLocal = false;
}