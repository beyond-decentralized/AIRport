import {
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                           from "@airport/air-control";
import {ApplicationPackage} from "./ApplicationPackage";

export type PackageId = number;
export type PackageName = string;

@Entity()
@Table({name: "PACKAGES"})
export class Package {

	@Id()
	@GeneratedValue()
	id: PackageId;

	name: PackageName;

	@OneToMany({mappedBy: "package"})
	applicationPackages: ApplicationPackage[];

}