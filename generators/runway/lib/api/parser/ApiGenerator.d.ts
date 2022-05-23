import { IApiObject, IApplicationApi } from '@airport/check-in';
import * as ts from 'typescript';
import { FileImports } from '../../ddl/parser/FileImports';
export interface IApiSignature {
    isAsync: boolean;
    name: string;
    parameters: string[];
    returnType: string;
}
export interface IApiClass {
    className: string;
    apiSignatures: IApiSignature[];
}
export interface IApiFileForGeneration {
    apiClasses: IApiClass[];
    fileName: string;
    imports: FileImports;
    otherMemberDefinitions: string[];
}
export declare const currentApplicationApi: IApplicationApi;
export declare const currentApiFileSignatureMap: {
    [filePath: string]: IApiFileForGeneration;
};
export declare function visitApiFile(node: ts.Node, path: string): IApiObject;
//# sourceMappingURL=ApiGenerator.d.ts.map