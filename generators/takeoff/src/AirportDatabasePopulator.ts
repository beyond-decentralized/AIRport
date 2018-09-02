import {
	AirportDatabaseToken,
	IAirportDatabase
}                                      from '@airport/air-control'
import {
	Inject,
	Service
}                                      from 'typedi'
import {AirportDatabasePopulatorToken} from './InjectionTokens'

export interface IAirportDatabasePopulator {

	populate(): void;

}

@Service(AirportDatabasePopulatorToken)
export class AirportDatabasePopulator
	implements IAirportDatabasePopulator {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDatabase: IAirportDatabase,
	) {}

	populate(): void {
		this.airportDatabase.schemas
		this.airportDatabase.schemaMapByName
		this.airportDatabase.qSchemas
		this.airportDatabase.qSchemaMapByName
	}

}