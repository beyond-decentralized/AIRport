import {
	MappedSuperclass
} from '@airport/tarmaq-entity'
import { AirEntityFields } from './AirEntityFields'

/**
 * Created by Papa on 2/17/2017.
 */

@MappedSuperclass()
export abstract class AirEntity
	extends AirEntityFields {

}
