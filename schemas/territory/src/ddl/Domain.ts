import {
	DbDomain,
	DomainId,
	DomainName,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                    from "@airport/air-control";
import {Application} from "./Application";

@Entity()
@Table({name: "DOMAINS"})
export class Domain
	implements DbDomain {

	@Id()
	@GeneratedValue()
	id: DomainId;

	name: DomainName;

	@OneToMany({mappedBy: "domain"})
	applications: Application[];

}