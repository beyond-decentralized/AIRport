import { JsonApplicationWithLastIds, ILastIds } from "@airport/air-traffic-control"
import { IContext } from "@airport/direction-indicator"

export interface IApplicationLoader {

    load(
        lastIds: ILastIds
    ): Promise<void>

    initialize(): Promise<void>

    getApplication(): JsonApplicationWithLastIds

}
