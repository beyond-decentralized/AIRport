import {
	AIR_DB,
	IAirportDatabase
}                         from '@airport/air-control'
import {DI}               from '@airport/di'
import {AIR_DB_POPULATOR} from './diTokens'

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

DI.set(AIR_DB_POPULATOR, AirportDatabasePopulator)
