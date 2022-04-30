import { AIRPORT_DATABASE } from "@airport/air-control";
import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import { SQL_QUERY_ADAPTOR } from "@airport/fuel-hydrant-system";
import { APPLICATION_BUILDER } from "@airport/landing";
import { STORE_DRIVER } from "@airport/terminal-map";
import { PostgreQueryAdaptor } from "./PostgreQueryAdaptor";
import { PostgreApplicationBuilder } from "./PostgreSchemaBuilder";
import { PostgreSqlDriver } from "./PostgreSqlDriver";

DEPENDENCY_INJECTION.set(APPLICATION_BUILDER, PostgreApplicationBuilder)
DEPENDENCY_INJECTION.set(SQL_QUERY_ADAPTOR, PostgreQueryAdaptor);
DEPENDENCY_INJECTION.set(STORE_DRIVER, PostgreSqlDriver);
