import { PropertyDocEntry } from "../../../parser/DocEntry";
import { EntityCandidate } from "../../../parser/EntityCandidate";
import { SColumn } from "../../application/SProperty";
import { IBuilder, MemberData } from "../../Builder";
import { FileBuilder } from "../FileBuilder";
import { VPropertyBuilder } from "./VPropertyBuilder";
import { VRelationBuilder } from "./VRelationBuilder";
import { VTransientBuilder } from "./VTransientBuilder";
export interface IVCoreEntityBuilder extends IBuilder {
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
export declare abstract class VCoreEntityBuilder implements IVCoreEntityBuilder {
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
    protected getVPropertyBuilders(properties: PropertyDocEntry[]): VPropertyBuilder[];
    protected getVTransientPropertyBuilders(properties: PropertyDocEntry[]): VTransientBuilder[];
    protected getVRelationBuilders(properties: PropertyDocEntry[], buildRelationInstance: boolean): VRelationBuilder[];
    protected buildPropertyData(propertyBuilders: VPropertyBuilder[]): MemberData;
    protected buildRelationData(relationBuilders: VRelationBuilder[]): MemberData;
    private addVPropertyBuilder;
    private addVRelationBuilder;
}
export declare function getVPropertyFieldInterface(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getVColumnFieldInterface(//
sColumn: SColumn): string;
export declare function getVPrimitiveFieldInterface(//
primitive: string): string;
export declare function getVPropertyFieldClass(//
propertyDocEntry: PropertyDocEntry): string;
//# sourceMappingURL=VCoreEntityBuilder.d.ts.map