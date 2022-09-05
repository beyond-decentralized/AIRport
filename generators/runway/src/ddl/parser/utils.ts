import * as fs from 'fs';
import * as ts from 'typescript';
import tsc     from 'typescript';

/**
 * Created by Papa on 3/27/2016.
 */

export interface EntityDecorator {
	isSuperclass: boolean;
}

export function isDecoratedAsEntity(
	decorators: readonly ts.Decorator[]
): EntityDecorator {
	if (!decorators || !decorators.length) {
		return null;
	}
	let isDecoratedAsEntity: EntityDecorator;
	decorators.some((
		decorator: ts.Decorator
	) => {
		let expression: ts.Identifier = <any>decorator.expression;
		if (!expression) {
			return false;
		}
		if (<any>expression.kind === tsc.SyntaxKind.CallExpression) {
			expression = <ts.Identifier>(<ts.CallExpression><any>expression).expression;
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
		} else if (decoratorName === 'MappedSuperclass') {
			isDecoratedAsEntity = {
				isSuperclass: true
			};
			return true;
		}
	});

	return isDecoratedAsEntity;
}

export function getClassPath(
	sourceFile: ts.SourceFile
): string {
	if (!sourceFile) {
		return null;
	}
	if (!sourceFile || sourceFile.kind !== tsc.SyntaxKind.SourceFile) {
		return null;
	}

	return fs.realpathSync.native((<any>sourceFile).path);
}

export function getImplementedInterfaces(
	classSymbol: ts.Symbol
): string[] {
	let valueDeclaration: ts.ClassLikeDeclaration = <ts.ClassLikeDeclaration>classSymbol.valueDeclaration;
	if (!valueDeclaration.heritageClauses) {
		return [];
	}
	let interfaces: string[] = [];
	valueDeclaration.heritageClauses.forEach((heritageClause: ts.HeritageClause) => {
		if (heritageClause.token != tsc.SyntaxKind.ImplementsKeyword) {
			return;
		}
		heritageClause.types.forEach(
			type => {
				interfaces.push((<ts.Identifier>type.expression).text);
			});
	});

	return interfaces;
}

export function getParentClassImport(
	classSymbol: ts.Node,
	parentClassName: string
): string {
	let parentClassImport: string = null;

	let parent = <ts.Symbol><any>classSymbol.parent;
	if (!parent) {
		return parentClassImport;
	}
	let valueDeclaration: ts.SourceFile = <ts.SourceFile>parent.valueDeclaration;
	if (!valueDeclaration || valueDeclaration.kind !== tsc.SyntaxKind.SourceFile) {
		return parentClassImport;
	}
	const imports: ts.Identifier[] = (<any>valueDeclaration)['imports'];
	if (!imports || !imports.length) {
		return parentClassImport;
	}
	imports.some((
		anImport: ts.Identifier
	) => {
		if (<any>anImport.kind !== tsc.SyntaxKind.StringLiteral) {
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

export function getParentClassName(
	classSymbol: ts.Symbol
): string {
	let parentEntityName: string = null;

	if (!classSymbol.declarations || !classSymbol.declarations.length) {
		return parentEntityName;
	}

	classSymbol.declarations.some((
		declaration: ts.ClassLikeDeclaration
	) => {
		if (declaration.kind !== tsc.SyntaxKind.ClassDeclaration) {
			return false;
		}
		let heritageClauses = declaration.heritageClauses;
		if (!heritageClauses || !heritageClauses.length) {
			return false;
		}
		return heritageClauses.some((
			heritageClause: ts.HeritageClause
		) => {
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
			return types.some((
				type: ts.ExpressionWithTypeArguments
			) => {
				let expression: ts.Identifier = <any>type.expression;
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

export function isPrimitive(
	type: string
) {
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

export function endsWith(
	target: string,
	suffix: string
) {
	return target.indexOf(suffix, target.length - suffix.length) !== -1;
}

export function startsWith(
	target: string,
	suffix: string
) {
	return target.indexOf(suffix) === 0;
}
