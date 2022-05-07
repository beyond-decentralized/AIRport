import { IChildContainer } from "./IChildContainer";

export interface IContainerAccessor {

    getContainer(
        injectedObject
    ): IChildContainer

}
