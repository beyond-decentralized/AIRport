import { AIRPORT_DATABASE }                       from '@airport/air-control';
import { SEQUENCE_GENERATOR }           from '@airport/check-in';
import { DI }                           from '@airport/di';
import {
	JsonSchema,
	STORE_DRIVER
}                                       from '@airport/ground-control';
import {
	SCHEMA_BUILDER,
	SCHEMA_INITIALIZER
}                                       from '@airport/landing';
import { injectTransactionalConnector } from '@airport/tarmaq';
import {
	DATABASE_MANAGER,
	injectTransactionalServer
}                                       from '@airport/terminal';
import { injectAirportDatabase }        from '@airport/tower';
import { NoOpSchemaBuilder }            from './NoOpSchemaBuilder';
import { NoOpSequenceGenerator }        from './NoOpSequenceGenerator';
import { NoOpSqlDriver }                from './NoOpSqlDriver';

export interface ITempDatabase {

	initialize(
		schemas: JsonSchema[]
	): Promise<void>

}

export class TempDatabase
	implements ITempDatabase {

	private tempDbInitialized = false;

	async initialize(
		schemas: JsonSchema[]
	): Promise<void> {
		if (this.tempDbInitialized) {
			const schemaInitializer = await DI.db().get(SCHEMA_INITIALIZER);
			await schemaInitializer.stage(schemas, {});
			return;
		}

		DI.set(SEQUENCE_GENERATOR, NoOpSequenceGenerator);
		DI.set(SCHEMA_BUILDER, NoOpSchemaBuilder);
		DI.set(STORE_DRIVER, NoOpSqlDriver);
		injectAirportDatabase();
		injectTransactionalServer();
		injectTransactionalConnector();

		await DI.db().get(AIRPORT_DATABASE);
		const dbManager = await DI.db().get(DATABASE_MANAGER);
		await dbManager.initNoDb({}, ...schemas);

		this.tempDbInitialized = true;
	}

}
