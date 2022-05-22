import { IApiObject, IApplicationApi } from '@airport/check-in';
import * as ts from 'typescript';
import { FileImports } from '../../ddl/parser/FileImports';
export interface IApiSignature {
    isAsync: boolean;
    name: string;
    parameters: string[];
    returnType: string;
}
export interface IApiFileForGeneration {
    className: string;
    apiSignatures: IApiSignature[];
    imports: FileImports;
}
export declare const currentApplicationApi: IApplicationApi;
export declare const currentApiFileSignatures: IApiFileForGeneration[];
export declare function visitApiFile(node: ts.Node, path: string): IApiObject;
//# sourceMappingURL=ApiGenerator.d.ts.map