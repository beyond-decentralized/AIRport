import {
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-control'
import {ApplicationPackageId} from '@airport/ground-control'
import {Application}          from "./Application";
import {Package}              from "./Package";

@Entity()
@Table({name: "APPLICATION_PACKAGES"})
export class ApplicationPackage {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: ApplicationPackageId

	@ManyToOne()
	@JoinColumn({name: "APPLICATION_ID", referencedColumnName: "ID"})
	application: Application

	@ManyToOne()
	@JoinColumn({name: "PACKAGE_ID", referencedColumnName: "ID"})
	package: Package

}