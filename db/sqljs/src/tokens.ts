import { SQL_QUERY_ADAPTOR } from "@airport/fuel-hydrant-system";
import { STORE_DRIVER } from "@airport/terminal-map";
import { SqlJsDriver } from "./SqlJsDriver";
import { SqlJsQueryAdaptor } from "./SqlJsQueryAdaptor";

STORE_DRIVER.setClass(SqlJsDriver)
SQL_QUERY_ADAPTOR.setClass(SqlJsQueryAdaptor)
