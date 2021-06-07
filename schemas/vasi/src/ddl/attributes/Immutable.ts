import {
	Column,
	MappedSuperclass
}                  from '@airport/air-control'

@MappedSuperclass()
export abstract class Immutable {

	@Column({name: 'CREATED_AT'})
	createdAt: Date

}
