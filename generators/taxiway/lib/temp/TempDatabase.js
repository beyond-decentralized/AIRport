import { AIRPORT_DATABASE } from '@airport/air-control';
import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { DI } from '@airport/di';
import { STORE_DRIVER } from '@airport/ground-control';
import { SCHEMA_BUILDER, SCHEMA_INITIALIZER } from '@airport/landing';
import { DATABASE_MANAGER, injectTransactionalConnector, injectTransactionalServer } from '@airport/terminal';
import { injectAirportDatabase } from '@airport/tower';
import { NoOpSchemaBuilder } from './NoOpSchemaBuilder';
import { NoOpSequenceGenerator } from './NoOpSequenceGenerator';
import { NoOpSqlDriver } from './NoOpSqlDriver';
export class TempDatabase {
    constructor() {
        this.tempDbInitialized = false;
    }
    async initialize(schemas) {
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
//# sourceMappingURL=TempDatabase.js.map