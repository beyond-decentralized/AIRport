import * as ts from 'typescript';

const decoratorsToExclude =
    ['Api', 'Column', 'Entity', 'DbAny', 'DbBoolean', 'DbDate',
        'DbNumber', 'DbString', 'GeneratedValue',
        'Id', 'Inject', 'Injected', 'JoinColumn', 'JoinColumns',
        'Json', 'ManyToOne', 'MappedSuperclass',
        'OneToMany', 'SequenceGenerator', 'Table', 'Transient'];

export default function (program: ts.Program, pluginOptions: any) {
    return (ctx: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            function visitor(node: ts.Node): ts.Node {
                if (ts.isDecorator(node)) {
                    const decorator = node as ts.Decorator;
                    if (ts.isCallExpression(decorator.expression)) {
                        const exp = decorator.expression as ts.CallExpression;
                        const decoratorName = exp.expression.getText();
                        console.log(`Found decorator: ${decoratorName}`);
                        if (decoratorsToExclude.includes(decoratorName)) {
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
            return ts.visitEachChild(sourceFile, visitor, ctx);
        };
    }
}