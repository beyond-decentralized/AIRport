import { AIRPORT_DATABASE, JsonApplicationWithLastIds } from '@airport/air-traffic-control';
import { IOC } from '@airport/direction-indicator';
import {
	JsonApplication, SEQUENCE_GENERATOR
} from '@airport/ground-control';
import {
	SCHEMA_BUILDER
} from '@airport/takeoff';
import {
	DatabaseManager,
	injectTransactionalConnector,
	injectTransactionalServer
} from '@airport/terminal';
import {
	APPLICATION_INITIALIZER,
	STORE_DRIVER
} from '@airport/terminal-map';
import { injectAirportDatabase } from '@airport/tower';
import { NoOpSchemaBuilder } from './NoOpSchemaBuilder';
import { NoOpSequenceGenerator } from './NoOpSequenceGenerator';
import { NoOpSqlDriver } from './NoOpSqlDriver';

export interface ITempDatabase {

	initialize(
		applications: JsonApplication[]
	): Promise<void>

}

export class TempDatabase
	implements ITempDatabase {

	private tempDbInitialized = false;

	async initialize(
		applications: JsonApplicationWithLastIds[]
	): Promise<void> {
		if (this.tempDbInitialized) {
			const applicationInitializer = await IOC.get(APPLICATION_INITIALIZER);
			await applicationInitializer.stage(applications, {});
			return;
		}

		SEQUENCE_GENERATOR.setClass(NoOpSequenceGenerator);
		SCHEMA_BUILDER.setClass(NoOpSchemaBuilder);
		STORE_DRIVER.setClass(NoOpSqlDriver);
		injectAirportDatabase();
		injectTransactionalServer();
		injectTransactionalConnector();

		await IOC.get(AIRPORT_DATABASE);
		const dbManager = await IOC.get(DatabaseManager);
		await dbManager.initNoDb({}, ...applications);

		this.tempDbInitialized = true;
	}

}
