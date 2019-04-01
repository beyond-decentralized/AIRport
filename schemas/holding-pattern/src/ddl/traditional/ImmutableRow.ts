import {
	Column,
	JoinColumn,
	ManyToOne,
	MappedSuperclass
}                  from '@airport/air-control'
import {IUser}     from '@airport/travel-document-checkpoint'
import {Stageable} from '../infrastructure/Stageable'

@MappedSuperclass()
export abstract class ImmutableRow
	extends Stageable {

	@ManyToOne()
	@JoinColumn({name: 'USER_ACCOUNT_ID'})
	user: IUser

	@Column({name: 'CREATED_AT'})
	createdAt: Date

}
