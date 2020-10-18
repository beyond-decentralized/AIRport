import {
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from '@airport/air-control'
import {
	ApplicationId,
	ApplicationName
}                           from '@airport/ground-control'
import {ApplicationPackage} from "./ApplicationPackage";
import {Domain}             from "./Domain";


@Entity()
@Table({name: "APPLICATIONS"})
export class Application {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: ApplicationId

	@DbString()
	name: ApplicationName

	@ManyToOne()
	@JoinColumn({name: "DOMAIN_ID", referencedColumnName: "ID"})
	domain: Domain

	@OneToMany({mappedBy: "application"})
	applicationPackages: ApplicationPackage[] = []

}
