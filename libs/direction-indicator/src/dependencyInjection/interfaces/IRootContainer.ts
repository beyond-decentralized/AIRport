import { IChildContainer } from "./IChildContainer"
import { IContainer } from "./IContainer"

export interface IRootContainer
    extends IContainer {

    isFramework: boolean

    // objectPoolMap: Map<string, any[]>

    db(
        databaseComponentId?: string
    ): IChildContainer

    ui(
        componentName: string
    ): IChildContainer

    remove(
        container: IChildContainer
    ): void

}