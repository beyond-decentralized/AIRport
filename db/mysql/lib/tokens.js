import { SQL_QUERY_ADAPTOR } from "@airport/fuel-hydrant-system";
import { APPLICATION_BUILDER } from "@airport/landing";
import { STORE_DRIVER } from "@airport/terminal-map";
import { MySqlDriver } from "./MySqlDriver";
import { MySqlQueryAdaptor } from "./MySqlQueryAdaptor";
import { MySqlApplicationBuilder } from "./MySqlSchemaBuilder";
STORE_DRIVER.setClass(MySqlDriver);
SQL_QUERY_ADAPTOR.setClass(MySqlQueryAdaptor);
APPLICATION_BUILDER.setClass(MySqlApplicationBuilder);
//# sourceMappingURL=tokens.js.map