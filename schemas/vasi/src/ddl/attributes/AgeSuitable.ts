import {
	Column,
	MappedSuperclass
}                          from '@airport/air-control'
import {ImmutableWithActor} from './ImmutableWithActor'

@MappedSuperclass()
export abstract class AgeSuitable
	extends ImmutableWithActor {

	@Column({name: 'AGE_SUITABILITY', nullable: false})
	ageSuitability: number

}
