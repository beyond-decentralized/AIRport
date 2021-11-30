import {
	Column,
	DbDate,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from "@airport/air-control";
import {
	Actor
} from '../infrastructure/Actor'
import {
	RepositoryActor
} from '../repository/RepositoryActor'
import {
	RepositoryTransactionHistory
} from '../history/RepositoryTransactionHistory'
import { SyncPriority } from "./SyncPrority";

/**
 * Created by Papa on 2/9/2017.
 */

export type Repository_AgeSuitability = 0 | 7 | 13 | 18
export type Repository_CreatedAt = Date;
export type Repository_Id = number;
export type Repository_Immutable = boolean;
export type Repository_Name = string;
export type Repository_Source = string;
export type Repository_Url = string;
export type Repository_UuId = string;

@Entity()
@Table({
	name: "REPOSITORY"
})
export class Repository {

	@Column({ name: "ID" })
	@GeneratedValue()
	@Id()
	@DbNumber()
	id: Repository_Id;

	@Column({ name: "CREATED_AT", nullable: false })
	@DbDate()
	createdAt: Repository_CreatedAt;

	@Column({ name: "UU_ID", nullable: false })
	@DbString()
	uuId: Repository_UuId;

	@Column({ name: 'AGE_SUITABILITY', nullable: false })
	@DbNumber()
	ageSuitability: Repository_AgeSuitability

	@Column({ name: "SOURCE" })
	@DbString()
	source: Repository_Source

	@Column({ name: "IMMUTABLE", nullable: false })
	immutable: Repository_Immutable

	@ManyToOne()
	@JoinColumn({
		name: "OWNER_ACTOR_ID", referencedColumnName: "ID",
		nullable: false
	})
	ownerActor: Actor;

	@OneToMany({ mappedBy: 'repository' })
	repositoryActors: RepositoryActor[] = [];

	@OneToMany({ mappedBy: 'repository' })
	repositoryTransactionHistory: RepositoryTransactionHistory[] = [];

}
