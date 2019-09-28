import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                    from '@airport/air-control'
import {Actor}       from './Actor'
import {Application} from './Application'

/**
 * Created by Papa on 12/18/2016.
 */

/**
 * A record of device+datatabase that adds to a repository
 */
@Entity()
@Table({name: 'ACTOR_APPLICATION'})
export class ActorApplication {

	@Column({name: 'ID'})
	@GeneratedValue()
	@Id()
	id: number

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'ACTOR_ID', referencedColumnName: 'ID'})
	actor: Actor

	@ManyToOne()
	@JoinColumn({
		name: 'APPLICATION_ID', referencedColumnName: 'ID',
		nullable: false
	})
	application: Application

}
