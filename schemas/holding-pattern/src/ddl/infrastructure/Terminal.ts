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
import {IUser}      from "../../generated/infrastructure/quser";

export type TerminalId = number;
export type TerminalIsLocal = boolean;
export type TerminalName = string;
export type TerminalSecondId = number;

@Entity()
export class Terminal {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: TerminalId;

	@DbString()
	name: TerminalName;

	@Column({name: "SECOND_ID"})
	@DbNumber()
	secondId: TerminalSecondId;

	@ManyToOne()
	@JoinColumn({name: "OWNER_USER_ID", referencedColumnName: "ID"})
	owner: IUser;

	@Column({name: "IS_LOCAL"})
	@DbBoolean()
	isLocal: TerminalIsLocal = false;
}