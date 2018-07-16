import { PropertyDocEntry } from "../../parser/DocEntry";
import { IQCoreEntityBuilder } from "../QBuilder";
export declare class QTransientBuilder {
    private parentBuilder;
    propertyDocEntry: PropertyDocEntry;
    constructor(parentBuilder: IQCoreEntityBuilder, propertyDocEntry: PropertyDocEntry);
    buildInterfaceDefinition(): string;
}
