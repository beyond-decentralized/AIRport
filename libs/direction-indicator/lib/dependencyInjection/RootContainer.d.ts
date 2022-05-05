import { Container } from "./Container";
import { IChildContainer } from "./interfaces/IChildContainer";
import { IContainer } from "./interfaces/IContainer";
import { IRootContainer } from "./interfaces/IRootContainer";
export declare class RootContainer extends Container implements IRootContainer {
    isFramework: boolean;
    dbContainerMap: Map<string, IChildContainer>;
    uiContainers: Set<IContainer>;
    db(id?: string): IChildContainer;
    remove(container: IChildContainer): void;
    ui(componentName: string): IChildContainer;
}
//# sourceMappingURL=RootContainer.d.ts.map