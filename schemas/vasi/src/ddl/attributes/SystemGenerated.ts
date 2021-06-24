import { MappedSuperclass } from '@airport/air-control';
import { Immutable }        from './Immutable';

/**
 * Marker class to disallow modification of server generated tables.
 */
@MappedSuperclass()
export abstract class SystemGenerated
	extends Immutable {

}
