import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany
} from '@airport/air-control'
import {
	Terminal,
	User
} from '@airport/travel-document-checkpoint'
import { RepositoryActor } from '../repository/RepositoryActor'
import { Schema } from '@airport/airspace';

export type ActorId = number;
export type ActorUuId = string;

@Entity()
export class Actor {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'ID' })
	id: ActorId

	@Column({ name: 'UU_ID', nullable: false })
	@DbString()
	uuId: ActorUuId

	@ManyToOne()
	@JoinColumn({
		name: 'USER_ID', referencedColumnName: 'ID',
		nullable: false
	})
	user: User

	@ManyToOne()
	@JoinColumn({
		name: 'TERMINAL_ID', referencedColumnName: 'ID',
		nullable: false
	})
	terminal: Terminal

	@ManyToOne()
	@JoinColumn({ name: "SCHEMA_INDEX", referencedColumnName: "SCHEMA_INDEX" })
	schema: Schema

	@OneToMany({ mappedBy: 'actor' })
	repositoryActors: RepositoryActor[]

}
