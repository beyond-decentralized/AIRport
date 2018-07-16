import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id
}              from "@airport/air-control";
import {IUser} from "../../generated/infrastructure/quser";


export type UserId = number;
export type UserUniqueId = string;
export type UserFirstName = string;
export type UserLastName = string;
export type UserMiddleName = string;
export type UserPhone = string;

@Entity()
export class User
	implements IUser {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: UserId;

	@Column({name: "UNIQUE_IDENTIFIER"})
	@DbString()
	uniqueId: UserUniqueId;

	@Column({name: "FIRST_NAME"})
	@DbString()
	firstName: UserFirstName;

	@Column({name: "LAST_NAME"})
	@DbString()
	lastName: UserLastName;

	@Column({name: "MIDDLE_NAME"})
	@DbString()
	middleName: UserMiddleName;

	@DbString()
	phone: UserPhone;

}