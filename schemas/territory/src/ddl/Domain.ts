import {
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                    from "@airport/air-control";
import {
	DbDomain,
	DomainId,
	DomainName,
}                    from "@airport/ground-control";
import {Application} from "./Application";

@Entity()
@Table({name: "DOMAINS"})
export class Domain
	implements DbDomain {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: DomainId;

	@DbString()
	name: DomainName;

	@OneToMany({mappedBy: "domain"})
	applications: Application[];

}