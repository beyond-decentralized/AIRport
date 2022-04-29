import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import { SQL_QUERY_ADAPTOR } from "@airport/fuel-hydrant-system";
import { STORE_DRIVER } from "@airport/terminal-map";
import { SqlJsDriver } from "./SqlJsDriver";
import { SqlJsQueryAdaptor } from "./SqlJsQueryAdaptor";

DEPENDENCY_INJECTION.set(STORE_DRIVER, SqlJsDriver)
DEPENDENCY_INJECTION.set(SQL_QUERY_ADAPTOR, SqlJsQueryAdaptor)
