import {
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                from "@airport/air-control";
import {Package} from "./Package";

export type PackagedUnitId = number;
export type PackagedUnitName = string;

@Entity()
@Table({name: "PACKAGED_UNITS"})
export class PackagedUnit {

	@Id()
	@GeneratedValue()
	id: PackagedUnitId;

	name: PackagedUnitName;

	@ManyToOne()
	@JoinColumn({name: "PACKAGE_ID", referencedColumnName: "ID"})
	package: Package;

}