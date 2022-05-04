import { Context, ContextType, IInjectionContext } from "../Context";
import { ChildContainer } from "./ChildContainer";
import { Container } from "./Container";
import { IChildContainer } from "./interfaces/IChildContainer";
import { IContainer } from "./interfaces/IContainer";
import { IRootContainer } from "./interfaces/IRootContainer";

export class RootContainer
    extends Container
    implements IRootContainer {

    uiContainers: Set<IContainer> = new Set<IContainer>();
    dbContainerMap: Map<string, IChildContainer>
    objectPoolMap: Map<string, any[]> = new Map();

    db(
        id?: string
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
            const objectTokens = dbContainer.objectMap.keys()
            for (const objectToken of objectTokens) {
                const object = dbContainer.objectMap.get(objectToken)
                let objectPool = this.objectPoolMap.get(objectToken)
                if (!objectPool) {
                    objectPool = []
                    this.objectPoolMap.set(objectToken, objectPool)
                }
                objectPool.push(object)
            }
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