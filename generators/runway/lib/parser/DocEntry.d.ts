import { DbEntity } from "@airport/ground-control";
import { EntityCandidate } from "./EntityCandidate";
import { FileImports } from "./FileImports";
/**
 * Created by Papa on 3/28/2016.
 */
export interface Decorator {
    name: string;
    values: any[];
}
export interface DocEntry {
    name?: string;
    fileName?: string;
    decorators?: Decorator[];
    documentation?: string;
    isGenerated?: boolean;
    isId?: boolean;
    isMappedSuperclass?: boolean;
    isTransient?: boolean;
    type?: string;
    constructors?: DocEntry[];
    parameters?: DocEntry[];
    properties?: PropertyDocEntry[];
    returnType?: string;
}
export interface PropertyDocEntry extends DocEntry {
    columnDefinition?: string;
    entity?: EntityCandidate;
    fromProject?: string;
    otherSchemaDbEntity?: DbEntity;
    optional?: boolean;
    ownerEntity?: EntityCandidate;
    primitive?: 'any' | 'boolean' | 'Date' | 'number' | 'string' | 'Json';
    index?: number;
    isArray?: boolean;
    isMap?: boolean;
    mapKeyName?: string;
    mapKeyType?: string;
    mapValueType?: string;
    mapValueIsPrimitive?: boolean;
    nonArrayType?: string;
}
export interface ClassDocEntry extends DocEntry {
    fileImports?: FileImports;
    methodSignatures?: MethodSignatureDocEntry[];
}
export interface TypeOrParamDocEntry extends PropertyDocEntry {
    arrayDepth?: number;
    genericParams: TypeOrParamDocEntry[];
}
export interface MethodSignatureDocEntry {
    name: string;
    optional?: boolean;
    parameters: TypeOrParamDocEntry[];
    returnType: TypeOrParamDocEntry;
}
