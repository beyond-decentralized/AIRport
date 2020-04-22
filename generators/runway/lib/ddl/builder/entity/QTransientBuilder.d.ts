import { PropertyDocEntry } from "../../parser/DocEntry";
import { IQCoreEntityBuilder } from "../Builder";
export declare class QTransientBuilder {
    private parentBuilder;
    propertyDocEntry: PropertyDocEntry;
    constructor(parentBuilder: IQCoreEntityBuilder, propertyDocEntry: PropertyDocEntry);
    buildInterfaceDefinition(): string;
}
