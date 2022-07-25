import { PropertyDocEntry } from "../../../parser/DocEntry";
import { IVCoreEntityBuilder } from "./VCoreEntityBuilder";
export declare class VTransientBuilder {
    private parentBuilder;
    propertyDocEntry: PropertyDocEntry;
    constructor(parentBuilder: IVCoreEntityBuilder, propertyDocEntry: PropertyDocEntry);
    buildInterfaceDefinition(): string;
}
//# sourceMappingURL=VTransientBuilder.d.ts.map