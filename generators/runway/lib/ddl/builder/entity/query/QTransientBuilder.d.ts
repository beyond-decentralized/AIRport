import { PropertyDocEntry } from "../../../parser/DocEntry";
import { IQCoreEntityBuilder } from "./QCoreEntityBuilder";
export declare class QTransientBuilder {
    private parentBuilder;
    propertyDocEntry: PropertyDocEntry;
    constructor(parentBuilder: IQCoreEntityBuilder, propertyDocEntry: PropertyDocEntry);
    buildInterfaceDefinition(): string;
}
//# sourceMappingURL=QTransientBuilder.d.ts.map