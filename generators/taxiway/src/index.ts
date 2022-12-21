import * as ts from 'typescript';
import { elideImports } from './elide-imports';

const decoratorsToExclude =
    ['Api', 'Column', 'Entity', 'DbAny', 'DbBoolean', 'DbDate',
        'DbNumber', 'DbString', 'GeneratedValue',
        'Id', 'Inject', 'Injected', 'JoinColumn', 'JoinColumns',
        'Json', 'ManyToOne', 'MappedSuperclass',
        'OneToMany', 'SequenceGenerator', 'Table', 'Transient'];

export default function (program: ts.Program, pluginOptions: any) {
    return (ctx: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            const removedNodes: ts.Node[] = [];
            function visitor(node: ts.Node): ts.Node {
                if (ts.isDecorator(node)) {
                    const decorator = node as ts.Decorator;
                    if (ts.isCallExpression(decorator.expression)) {
                        const exp = decorator.expression as ts.CallExpression;
                        const decoratorName = exp.expression.getText();
                        console.log(`Found decorator: ${decoratorName}`);
                        if (decoratorsToExclude.includes(decoratorName)) {
                            removedNodes.push(node);
                            return undefined as any;
                        } else {
                            console.warn(`Not excluding '${decoratorName}' decorator from the bundle.`)
                        }
                    }
                }

                return ts.visitEachChild(
                    node,
                    visitor,
                    ctx
                );
            };

            let updatedSourceFile = ts.visitEachChild(sourceFile, visitor, ctx);

            if (removedNodes.length > 0) {
                // Remove any unused imports
                const importRemovals = elideImports(
                    updatedSourceFile,
                    removedNodes,
                    program.getTypeChecker,
                    ctx.getCompilerOptions()
                );
                if (importRemovals.size > 0) {
                    updatedSourceFile = ts.visitEachChild(
                        updatedSourceFile,
                        function visitForRemoval(node): ts.Node | undefined {
                            return importRemovals.has(node)
                                ? undefined
                                : ts.visitEachChild(node, visitForRemoval, ctx);
                        },
                        ctx
                    );
                }
            }

            return updatedSourceFile;
        };
    }
}