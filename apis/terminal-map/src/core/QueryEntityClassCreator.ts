import { IAirportDatabase } from "@airport/air-control";
import { IApplication } from "@airport/airspace";

export interface IQueryEntityClassCreator {

    createAll(
        applications: IApplication[],
        airDb: IAirportDatabase
    ): void

}
