import * as fs from 'fs';
import tsc from 'typescript';
export function isDecoratedAsEntity(decorators) {
    if (!decorators || !decorators.length) {
        return null;
    }
    let isDecoratedAsEntity;
    decorators.some((decorator) => {
        let expression = decorator.expression;
        if (!expression) {
            return false;
        }
        if (expression.kind === tsc.SyntaxKind.CallExpression) {
            expression = expression.expression;
        }
        if (expression.kind !== tsc.SyntaxKind.Identifier) {
            return false;
        }
        let decoratorName = expression.text;
        if (decoratorName === 'Entity') {
            isDecoratedAsEntity = {
                isSuperclass: false
            };
            return true;
        }
        else if (decoratorName === 'MappedSuperclass') {
            isDecoratedAsEntity = {
                isSuperclass: true
            };
            return true;
        }
    });
    return isDecoratedAsEntity;
}
export function getClassPath(sourceFile) {
    if (!sourceFile) {
        return null;
    }
    if (!sourceFile || sourceFile.kind !== tsc.SyntaxKind.SourceFile) {
        return null;
    }
    return fs.realpathSync.native(sourceFile.path);
}
export function getImplementedInterfaces(classSymbol) {
    let valueDeclaration = classSymbol.valueDeclaration;
    if (!valueDeclaration.heritageClauses) {
        return [];
    }
    let interfaces = [];
    valueDeclaration.heritageClauses.forEach((heritageClause) => {
        if (heritageClause.token != tsc.SyntaxKind.ImplementsKeyword) {
            return;
        }
        heritageClause.types.forEach(type => {
            interfaces.push(type.expression.text);
        });
    });
    return interfaces;
}
export function getParentClassImport(classSymbol, parentClassName) {
    let parentClassImport = null;
    let parent = classSymbol.parent;
    if (!parent) {
        return parentClassImport;
    }
    let valueDeclaration = parent.valueDeclaration;
    if (!valueDeclaration || valueDeclaration.kind !== tsc.SyntaxKind.SourceFile) {
        return parentClassImport;
    }
    const imports = valueDeclaration['imports'];
    if (!imports || !imports.length) {
        return parentClassImport;
    }
    imports.some((anImport) => {
        if (anImport.kind !== tsc.SyntaxKind.StringLiteral) {
            return false;
        }
        let parent = anImport.parent;
        if (!parent || parent.kind !== tsc.SyntaxKind.ImportDeclaration) {
            return false;
        }
        let nameMatches = endsWith(anImport.text, parentClassName);
        if (nameMatches && anImport.text.length > parentClassName.length) {
            nameMatches = endsWith(anImport.text, `/${parentClassName}`);
        }
        if (nameMatches) {
            parentClassImport = anImport.text;
            return true;
        }
    });
    return parentClassImport;
}
export function getParentClassName(classSymbol) {
    let parentEntityName = null;
    if (!classSymbol.declarations || !classSymbol.declarations.length) {
        return parentEntityName;
    }
    classSymbol.declarations.some((declaration) => {
        if (declaration.kind !== tsc.SyntaxKind.ClassDeclaration) {
            return false;
        }
        let heritageClauses = declaration.heritageClauses;
        if (!heritageClauses || !heritageClauses.length) {
            return false;
        }
        return heritageClauses.some((heritageClause) => {
            if (heritageClause.kind !== tsc.SyntaxKind.HeritageClause) {
                return false;
            }
            if (heritageClause.token !== tsc.SyntaxKind.ExtendsKeyword) {
                return false;
            }
            let types = heritageClause.types;
            if (!types || !types.length) {
                return false;
            }
            return types.some((type) => {
                let expression = type.expression;
                if (!expression || expression.kind !== tsc.SyntaxKind.Identifier) {
                    return false;
                }
                parentEntityName = expression.text;
                return true;
            });
        });
    });
    return parentEntityName;
}
export function isPrimitive(type) {
    switch (type) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'Date':
        case 'any':
            return true;
    }
    return false;
}
export function endsWith(target, suffix) {
    return target.indexOf(suffix, target.length - suffix.length) !== -1;
}
export function startsWith(target, suffix) {
    return target.indexOf(suffix) === 0;
}
//# sourceMappingURL=utils.js.map