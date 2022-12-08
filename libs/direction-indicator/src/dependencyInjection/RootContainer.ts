import { Context, ContextType } from "../Context";
import { ChildContainer } from "./ChildContainer";
import { Container } from "./Container";
import { IChildContainer } from "./interfaces/IChildContainer";
import { IContainer } from "./interfaces/IContainer";
import { IRootContainer } from "./interfaces/IRootContainer";

export class RootContainer
    extends Container
    implements IRootContainer {

    isFramework = false
    dbContainerMap: Map<string, IChildContainer> = new Map();
    uiContainers: Set<IContainer> = new Set<IContainer>();

    // NOTE: Object pooling is not supported because of possible callbacks
    // that are out of synchronous flow of a transaction.  Thus objects are
    // retained in the container even after the container is removed
    // in order to allow for transactionId reference
    // objectPoolMap: Map<string, any[]> = new Map();

    db(
        id: string = null
    ): IChildContainer {
        let dbContainer = this.dbContainerMap.get(id)
        if (!dbContainer) {
            dbContainer = new ChildContainer(this, new Context(id, ContextType.DB));
            this.dbContainerMap.set(id, dbContainer)
        }

        return dbContainer;
    }

    remove(
        container: IChildContainer
    ): void {
        if (!container) {
            return
        }

        const dbContainer = this.dbContainerMap.get(container.context.id)
        if (dbContainer) {
            this.dbContainerMap.delete(container.context.id)
            // NOTE: objectPooling is not supported, see above
            // const objectTokens = dbContainer.objectMap.keys()
            // for (const objectToken of objectTokens) {
            // const object = dbContainer.objectMap.get(objectToken)
            // let objectPool = this.objectPoolMap.get(objectToken)
            // if (!objectPool) {
            //     objectPool = []
            //     this.objectPoolMap.set(objectToken, objectPool)
            // }
            // objectPool.push(object)
            // }
        } else {
            this.uiContainers.delete(container);
        }

    }

    ui(
        componentName: string
    ): IChildContainer {
        const context = new Context(componentName, ContextType.UI);

        const childContainer = new ChildContainer(this, context);

        this.uiContainers.add(childContainer);

        return childContainer;
    }

}

export const DEPENDENCY_INJECTION: IRootContainer = new RootContainer();
globalThis.RootContainer = RootContainer
globalThis.DEPENDENCY_INJECTION = DEPENDENCY_INJECTION
