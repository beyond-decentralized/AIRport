import { ImplementationFileBuilder } from './ImplementationFileBuilder'
import { PathBuilder } from './PathBuilder'

export class DvoBuilder
	extends ImplementationFileBuilder {

	private classSuffix = 'Dvo'

	private diSet

	constructor(
		private applicationFullName: string,
		pathBuilder: PathBuilder,
	) {
		super('baseDvos', pathBuilder)

		this.diSet = applicationFullName + '_diSet'
	}

	build(): string {
		this.entityNames.sort()
		const baseClassDefinitions = this.buildBaseClassDefinitions()

		const imports = this.buildImports()

		return `/* eslint-disable */
${imports}

// Application Q object Dependency Injection readiness detection ${this.classSuffix}
export class SQDI${this.classSuffix}<Entity, EntityVDescriptor>
	extends ${this.classSuffix}<Entity, EntityVDescriptor, ${this.applicationFullName}_LocalQApp> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q_${this.applicationFullName})
	}
}

${baseClassDefinitions}`
	}

	protected addImports() {
		this.entityNames.forEach(
			entityName => {
				this.addImport([
					`${entityName}`
				], `${this.ddlPathMapByEntityName[entityName]}`)
				this.addImport([
					`${entityName}VDescriptor`
				], `${this.pathBuilder.prefixToFileName(this.generatedPathMapByEntityName[entityName], '')}`)
			})
		this.addImport([
			`${this.classSuffix}`,
			'IDvo'
		], '@airbridge/validate')
		this.addImport([
			{
				asName: 'DbEntityId',
				sourceName: 'DbEntity_LocalId'
			}
		], '@airport/ground-control')
		this.addImport([
			`Q_${this.applicationFullName}`,
			`${this.applicationFullName}_LocalQApp`,
			`${this.diSet}`
		], './qApplication')
	}

	protected buildBaseClassDefinitions(): string {
		return this.entityNames.map(
			entityName => `
export interface IBase${entityName}${this.classSuffix}
  extends I${this.classSuffix}<${entityName}, ${entityName}VDescriptor<${entityName}>, ${this.applicationFullName}_LocalQApp> {
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
`).join('\n')
	}

	protected buildStaticProperties(
		entityName: string
	): string {
		return ''
	}

}
