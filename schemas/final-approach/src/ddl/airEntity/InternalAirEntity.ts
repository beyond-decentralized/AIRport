import {
	MappedSuperclass
} from '@airport/tarmaq-entity'
import { AirEntityFields } from './AirEntityFields';

/**
 * Created by Papa on 2/17/2017.
 */

// Used withint the framework because it imports from '@airport/travel-document-checkpoint/dist/app/bundle'
@MappedSuperclass()
export abstract class InternalAirEntity
	extends AirEntityFields {


}
