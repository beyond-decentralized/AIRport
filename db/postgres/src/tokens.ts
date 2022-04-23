import { AIRPORT_DATABASE } from "@airport/air-control";
import { APPLICATION_BUILDER } from "@airport/landing";

APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})
