import { PropertyDocEntry } from "../../../parser/DocEntry";
import { EntityCandidate } from "../../../parser/EntityCandidate";
import { SColumn } from "../../application/SProperty";
import { IBuilder, MemberData } from "../../Builder";
import { FileBuilder } from "../FileBuilder";
import { QColumnBuilder } from "./QColumnBuilder";
import { QPropertyBuilder } from "./QPropertyBuilder";
import { QRelationBuilder } from "./QRelationBuilder";
import { QTransientBuilder } from "./QTransientBuilder";
export interface IQCoreEntityBuilder extends IBuilder {
    constructorFields: {
        [name: string]: boolean;
    };
    entity: EntityCandidate;
    fileBuilder: FileBuilder;
    addImport(classNames: (string | {
        asName: string;
        sourceName: string;
    })[], filePath: string): void;
}
export declare abstract class QCoreEntityBuilder implements IQCoreEntityBuilder {
    entity: EntityCandidate;
    protected fullGenerationPath: string;
    protected workingDirPath: string;
    fileBuilder: FileBuilder;
    protected entityMapByName: {
        [entityName: string]: EntityCandidate;
    };
    constructorFields: {
        [name: string]: boolean;
    };
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: FileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    abstract build(...args: any[]): string;
    addImport(classNames: (string | {
        asName: string;
        sourceName: string;
    })[], filePath: string, toLowerCase?: boolean): void;
    protected getQColumnBuilders(columns: SColumn[]): QColumnBuilder[];
    protected getQPropertyBuilders(properties: PropertyDocEntry[]): QPropertyBuilder[];
    protected getQTransientPropertyBuilders(properties: PropertyDocEntry[]): QTransientBuilder[];
    protected getQRelationBuilders(properties: PropertyDocEntry[], buildRelationInstance: boolean): QRelationBuilder[];
    protected buildPropertyData(propertyBuilders: QPropertyBuilder[]): MemberData;
    protected buildRelationData(relationBuilders: QRelationBuilder[]): MemberData;
    private addQPropertyBuilder;
    private addQRelationBuilder;
}
export declare function getQPropertyFieldInterface(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getQColumnFieldInterface(//
sColumn: SColumn): string;
export declare function getQPrimitiveFieldInterface(//
primitive: string): string;
export declare function getQPropertyFieldClass(//
propertyDocEntry: PropertyDocEntry): string;
//# sourceMappingURL=QCoreEntityBuilder.d.ts.map