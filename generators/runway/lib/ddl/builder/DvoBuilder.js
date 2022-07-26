import { ImplementationFileBuilder } from './ImplementationFileBuilder';
export class DvoBuilder extends ImplementationFileBuilder {
    constructor(pathBuilder) {
        super('baseDvos', pathBuilder);
        this.classSuffix = 'Dvo';
        this.diSet = 'duoDiSet';
    }
    build() {
        this.entityNames.sort();
        const baseClassDefinitions = this.buildBaseClassDefinitions();
        const imports = this.buildImports();
        return `/* eslint-disable */
${imports}

// Application Q object Dependency Injection readiness detection ${this.classSuffix}
export class SQDI${this.classSuffix}<Entity, EntityVDescriptor>
	extends ${this.classSuffix}<Entity, EntityVDescriptor> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}

${baseClassDefinitions}`;
    }
    addImports() {
        this.entityNames.forEach(entityName => {
            this.addImport([
                `${entityName}`
            ], `${this.ddlPathMapByEntityName[entityName]}`);
            this.addImport([
                `${entityName}VDescriptor`
            ], `${this.pathBuilder.prefixToFileName(this.generatedPathMapByEntityName[entityName], 'v')}`);
        });
        this.addImport([
            `I${this.classSuffix}`,
            `${this.classSuffix}`
        ], '@airport/airbridge-validate');
        this.addImport([
            {
                asName: 'DbEntityId',
                sourceName: 'ApplicationEntity_LocalId'
            }
        ], '@airport/ground-control');
        this.addImport([
            'Q',
            `${this.diSet}`
        ], './qApplication', false);
    }
    buildBaseClassDefinitions() {
        return this.entityNames.map(entityName => `
export interface IBase${entityName}${this.classSuffix}
  extends I${this.classSuffix}<${entityName}, ${entityName}VDescriptor<${entityName}>> {
}

export class Base${entityName}${this.classSuffix}
  extends SQDI${this.classSuffix}<${entityName}, ${entityName}VDescriptor<${entityName}>>
	implements IBase${entityName}${this.classSuffix} {${this.buildStaticProperties(entityName)}

	static diSet(): boolean {
		return ${this.diSet}(${this.entityIdMapByName[entityName]})
	}
	
	constructor() {
		super(${this.entityIdMapByName[entityName]})
	}
}
`).join('\n');
    }
    buildStaticProperties(entityName) {
        return '';
    }
}
//# sourceMappingURL=DvoBuilder.js.map