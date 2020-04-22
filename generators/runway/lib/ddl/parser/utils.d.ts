import * as ts from 'typescript';
/**
 * Created by Papa on 3/27/2016.
 */
export interface EntityDecorator {
    isSuperclass: boolean;
}
export declare function isDecoratedAsEntity(decorators: ts.NodeArray<ts.Decorator>): EntityDecorator;
export declare function getClassPath(sourceFile: ts.SourceFile): string;
export declare function getImplementedInterfaces(classSymbol: ts.Symbol): string[];
export declare function getParentClassImport(classSymbol: ts.Node, parentClassName: string): string;
export declare function getParentClassName(classSymbol: ts.Symbol): string;
export declare function isPrimitive(type: string): boolean;
export declare function endsWith(target: string, suffix: string): boolean;
export declare function startsWith(target: string, suffix: string): boolean;
