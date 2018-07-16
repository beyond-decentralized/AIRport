import {
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                           from "@airport/air-control";
import {ApplicationPackage} from "./ApplicationPackage";
import {Domain}             from "./Domain";

export type ApplicationId = number;
export type ApplicationName = string;

@Entity()
@Table({name: "APPLICATIONS"})
export class Application {

	@Id()
	@GeneratedValue()
	id: ApplicationId;

	name: ApplicationName;

	@ManyToOne()
	@JoinColumn({name: "DOMAIN_ID", referencedColumnName: "ID"})
	domain: Domain;

	@OneToMany({mappedBy: "APPLICATION_ID"})
	applicationPackages: ApplicationPackage[];

}