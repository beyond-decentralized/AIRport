import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany
} from '@airport/air-control'
import {
	CascadeType
}                               from "@airport/ground-control";
import {IActorApplication,}     from "../../generated/infrastructure/qactorapplication";
import {IRepositoryApplication} from "../../generated/repository/qrepositoryapplication";

export type ApplicationId = number;
export type ApplicationHost = string;
export type ApplicationPort = number;

@Entity()
export class Application {

	@DbNumber()
	@GeneratedValue()
	@Id()
	id: ApplicationId;

	@DbString()
	host: ApplicationHost;

	@Column({name: 'PORT', nullable: false})
	@DbNumber()
	port: ApplicationPort;

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'application'})
	actorApplications: IActorApplication[] = [];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'application'})
	repositoryApplications: IRepositoryApplication[] = [];

}