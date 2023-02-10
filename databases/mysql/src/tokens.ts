import { SQL_QUERY_ADAPTOR } from "@airport/fuel-hydrant-system";
import { SCHEMA_BUILDER } from "@airport/takeoff";
import { STORE_DRIVER } from "@airport/terminal-map";
import { MySqlDriver } from "./MySqlDriver";
import { MySqlQueryAdaptor } from "./MySqlQueryAdaptor";
import { MySqlSchemaBuilder } from "./MySqlSchemaBuilder";

STORE_DRIVER.setClass(MySqlDriver)
SQL_QUERY_ADAPTOR.setClass(MySqlQueryAdaptor)
SCHEMA_BUILDER.setClass(MySqlSchemaBuilder)
