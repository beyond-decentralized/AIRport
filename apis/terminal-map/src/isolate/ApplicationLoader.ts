import { JsonApplicationWithLastIds, LastIds } from "@airport/air-traffic-control"

export interface IApplicationLoader {

    load(
        lastIds: LastIds
    ): Promise<void>

    initialize(): Promise<void>

    getApplication(): JsonApplicationWithLastIds

}
