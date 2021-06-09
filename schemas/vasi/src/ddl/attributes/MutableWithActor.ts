import {
	JoinColumn,
	ManyToOne,
	MappedSuperclass
}                    from '@airport/air-control'
import { Actor }     from '@airport/holding-pattern';
import {Immutable}   from './Immutable'

@MappedSuperclass()
export abstract class MutableWithActor
	extends Mutable {

	@ManyToOne()
	@JoinColumn({name: 'ACTOR_ID'})
	actor: Actor

	// @ManyToOne()
	// @JoinColumn({name: 'USER_ACCOUNT_ID'})
	// userAccount: UserAccount

}
