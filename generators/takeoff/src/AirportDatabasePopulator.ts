import {DI}               from '@airport/di'
import {AIRPORT_DATABASE_POPULATOR} from './tokens'

export interface IAirportDatabasePopulator {

	populate(): void;

}

// TODO: probably not needed, included schema source populates itself
// May be needed to populate schemas from the database
export class AirportDatabasePopulator
	implements IAirportDatabasePopulator {

	populate(): void {
		// FIXME: implement
		// this.airDb.schemas
		// this.airDb.qSchemas
	}

}

DI.set(AIRPORT_DATABASE_POPULATOR, AirportDatabasePopulator)
