import { JsonApplicationWithLastIds, ILastIds } from "@airport/air-traffic-control"

export interface IApplicationLoader {

    load(
        lastIds: ILastIds
    ): Promise<void>

    initialize(): Promise<void>

    getApplication(): JsonApplicationWithLastIds

}
