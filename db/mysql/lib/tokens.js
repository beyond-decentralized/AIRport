import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import { SQL_QUERY_ADAPTOR } from "@airport/fuel-hydrant-system";
import { APPLICATION_BUILDER } from "@airport/landing";
import { STORE_DRIVER } from "@airport/terminal-map";
import { MySqlDriver } from "./MySqlDriver";
import { MySqlQueryAdaptor } from "./MySqlQueryAdaptor";
import { MySqlApplicationBuilder } from "./MySqlSchemaBuilder";
DEPENDENCY_INJECTION.set(STORE_DRIVER, MySqlDriver);
DEPENDENCY_INJECTION.set(SQL_QUERY_ADAPTOR, MySqlQueryAdaptor);
DEPENDENCY_INJECTION.set(APPLICATION_BUILDER, MySqlApplicationBuilder);
//# sourceMappingURL=tokens.js.map