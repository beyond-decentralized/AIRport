import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany
}                              from '@airport/air-control'
import {RepositoryApplication} from '../repository/RepositoryApplication'
import {ActorApplication}      from './ActorApplication'

export type ApplicationId = number;
export type ApplicationHost = string;
export type ApplicationPort = number;

@Entity()
export class Application {

	@DbNumber()
	@GeneratedValue()
	@Id()
	id: ApplicationId

	@DbString()
	host: ApplicationHost

	@Column({name: 'PORT', nullable: false})
	@DbNumber()
	port: ApplicationPort

	@OneToMany({mappedBy: 'application'})
	actorApplications: ActorApplication[] = []

	@OneToMany({mappedBy: 'application'})
	repositoryApplications: RepositoryApplication[] = []

}
