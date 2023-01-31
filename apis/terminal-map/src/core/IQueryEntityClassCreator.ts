import { DbApplication } from "@airport/ground-control";

export interface IQueryEntityClassCreator {

    createAll(
        applications: DbApplication[]
    ): void

}
