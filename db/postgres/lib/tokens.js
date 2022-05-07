import { SQL_QUERY_ADAPTOR } from "@airport/fuel-hydrant-system";
import { APPLICATION_BUILDER } from "@airport/landing";
import { STORE_DRIVER } from "@airport/terminal-map";
import { PostgreQueryAdaptor } from "./PostgreQueryAdaptor";
import { PostgreApplicationBuilder } from "./PostgreSchemaBuilder";
import { PostgreSqlDriver } from "./PostgreSqlDriver";
APPLICATION_BUILDER.setClass(PostgreApplicationBuilder);
SQL_QUERY_ADAPTOR.setClass(PostgreQueryAdaptor);
STORE_DRIVER.setClass(PostgreSqlDriver);
//# sourceMappingURL=tokens.js.map