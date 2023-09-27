import { IApplication } from "@airport/ground-control";

export interface IQueryEntityClassCreator {

    createAll(
        applications: IApplication[]
    ): void

}
