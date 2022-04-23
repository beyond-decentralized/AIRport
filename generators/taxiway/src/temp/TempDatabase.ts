import { AIRPORT_DATABASE } from '@airport/air-control';
import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import {
	JsonApplication
} from '@airport/ground-control';
import {
	APPLICATION_BUILDER
} from '@airport/landing';
import {
	DATABASE_MANAGER,
	injectTransactionalConnector,
	injectTransactionalServer
} from '@airport/terminal';
import {
	APPLICATION_INITIALIZER,
	STORE_DRIVER
} from '@airport/terminal-map';
import { injectAirportDatabase } from '@airport/tower';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import { NoOpApplicationBuilder } from './NoOpApplicationBuilder';
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
			const applicationInitializer = await DEPENDENCY_INJECTION.db().get(APPLICATION_INITIALIZER);
			await applicationInitializer.stage(applications, {});
			return;
		}

		DEPENDENCY_INJECTION.set(SEQUENCE_GENERATOR, NoOpSequenceGenerator);
		DEPENDENCY_INJECTION.set(APPLICATION_BUILDER, NoOpApplicationBuilder);
		DEPENDENCY_INJECTION.set(STORE_DRIVER, NoOpSqlDriver);
		injectAirportDatabase();
		injectTransactionalServer();
		injectTransactionalConnector();

		await DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE);
		const dbManager = await DEPENDENCY_INJECTION.db().get(DATABASE_MANAGER);
		await dbManager.initNoDb({}, ...applications);

		this.tempDbInitialized = true;
	}

}
