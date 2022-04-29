import { AIRPORT_DATABASE } from "@airport/air-control";
import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import { APPLICATION_BUILDER } from "@airport/landing";
import { SqLiteApplicationBuilder } from "./SqLiteApplicationBuilder";

DEPENDENCY_INJECTION.set(APPLICATION_BUILDER, SqLiteApplicationBuilder);

APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})
