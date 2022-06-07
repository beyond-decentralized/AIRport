import {MappedSuperclass} from '@airport/air-traffic-control'
import {AirEntity} from '../repository/AirEntity'

@MappedSuperclass()
export abstract class ChildRepoRow
	extends AirEntity {

}