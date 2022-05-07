import { Container } from "./Container";
import { IInjected } from "./Injected";
import { IContainerAccessor } from "./interfaces/IContainerAccessor";
import { IChildContainer } from "./interfaces/IChildContainer";
import { Injected } from "./decorators";

@Injected()
export class ContainerAccessor
    implements IContainerAccessor {

    getContainer(
        injectedObject
    ): IChildContainer {
        const iocContainer = (injectedObject as IInjected).__container__;

        if (!iocContainer) {
            throw new Error('"container" is not set on injectable object.');
        }
        if (!(iocContainer instanceof Container)) {
            throw new Error('"container" property of injectable is not an' +
                'instance of @airport/direction-indicator Container');
        }

        return iocContainer;
    }
}