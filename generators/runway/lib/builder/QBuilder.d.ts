import { PropertyDocEntry } from "../parser/DocEntry";
import { EntityCandidate } from "../parser/EntityCandidate";
import { QColumnBuilder } from "./entity/QColumnBuilder";
import { QEntityFileBuilder } from "./entity/QEntityFileBuilder";
import { QPropertyBuilder } from "./entity/QPropertyBuilder";
import { QRelationBuilder } from "./entity/QRelationBuilder";
import { QTransientBuilder } from "./entity/QTransientBuilder";
import { SColumn } from "./schema/SProperty";
/**
 * Created by Papa on 4/25/2016.
 */
export interface IQBuilder {
    build(...args: any[]): string;
}
export interface MemberData {
    definitions: string;
}
export interface IQCoreEntityBuilder extends IQBuilder {
    constructorFields: {
        [name: string]: boolean;
    };
    entity: EntityCandidate;
    fileBuilder: QEntityFileBuilder;
    addImport(classNames: (string | {
        asName: string;
        sourceName: string;
    })[], filePath: string): void;
}
export declare abstract class QCoreEntityBuilder implements IQCoreEntityBuilder {
    entity: EntityCandidate;
    protected fullGenerationPath: string;
    protected workingDirPath: string;
    fileBuilder: QEntityFileBuilder;
    protected entityMapByName: {
        [entityName: string]: EntityCandidate;
    };
    constructorFields: {
        [name: string]: boolean;
    };
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: QEntityFileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    abstract build(...args: any[]): string;
    addImport(classNames: (string | {
        asName: string;
        sourceName: string;
    })[], filePath: string, toLowerCase?: boolean): void;
    protected getColumnBuilders(columns: SColumn[]): QColumnBuilder[];
    protected getPropertyBuilders(properties: PropertyDocEntry[]): QPropertyBuilder[];
    protected getTransientPropertyBuilders(properties: PropertyDocEntry[]): QTransientBuilder[];
    protected getRelationBuilders(properties: PropertyDocEntry[], buildRelationInstance: boolean): QRelationBuilder[];
    protected buildPropertyData(propertyBuilders: QPropertyBuilder[]): MemberData;
    protected buildRelationData(relationBuilders: QRelationBuilder[]): MemberData;
    private addPropertyBuilder;
    private addRelationBuilder;
}
export declare function getPropertyFieldType(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getPropertyJSONOperationInterface(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getPropertyTypedOperationInterface(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getPropertyFieldInterface(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getColumnFieldInterface(//
sColumn: SColumn): string;
export declare function getPrimitiveFieldInterface(//
primitive: string): string;
export declare function getPropertyFieldClass(//
propertyDocEntry: PropertyDocEntry): string;
export declare function getRelationFieldType(//
entityProperty: PropertyDocEntry): string;
