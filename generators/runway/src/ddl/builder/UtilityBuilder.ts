import { ImplementationFileBuilder } from './ImplementationFileBuilder'
import { PathBuilder } from './PathBuilder'

export abstract class UtilityBuilder
	extends ImplementationFileBuilder {

	private diSet

	constructor(
		private applicationFullName: string,
		pathBuilder: PathBuilder,
		private classSuffix: string,
		private baseClassSuffix: string = classSuffix,
		fileNameSuffx = classSuffix
	) {
		super('base' + fileNameSuffx + 's', pathBuilder)

		// this.diSet = needsQEntity ? 'diSet' : 'duoDiSet'
		this.diSet = applicationFullName + '_diSet'
	}

	build(): string {
		this.entityNames.sort()
		const baseClassDefinitions = this.buildBaseClassDefinitions()

		const imports = this.buildImports()

		return `/* eslint-disable */
${imports}

// Application Q object Dependency Injection readiness detection ${this.classSuffix}
export class SQDI${this.classSuffix}<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	DbEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity,
	LocalQApp extends QApp>
	extends ${this.baseClassSuffix}<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		DbEntity_LocalId,
		EntityCascadeGraph,
		IQE,
		LocalQApp> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q_${this.applicationFullName} as any)
	}

	get qSchema(): LocalQApp {
		return Q_${this.applicationFullName} as any
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
					`${entityName}ESelect`,
					`${entityName}ECreateColumns`,
					`${entityName}ECreateProperties`,
					`${entityName}EUpdateColumns`,
					`${entityName}EUpdateProperties`,
					`${entityName}EId`,
					`${entityName}Graph`,
					`Q${entityName}`
				], `${this.generatedPathMapByEntityName[entityName]}`)
			})
		this.addImport([
			'QApp'
		], '@airport/aviation-communication')
		this.addImport([
			'IEntityCascadeGraph',
			'IEntityCreateProperties',
			'IEntityIdProperties',
			'IEntitySelectProperties',
			'IEntityUpdateColumns',
			'IEntityUpdateProperties',
			'IQEntity'
		], '@airport/tarmaq-query')
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
  extends I${this.baseClassSuffix}<${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, ${entityName}Graph, Q${entityName}, 
	${this.applicationFullName}_LocalQApp> {
}

export class Base${entityName}${this.classSuffix}
  extends SQDI${this.classSuffix}<${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, ${entityName}Graph, Q${entityName}, 
	${this.applicationFullName}_LocalQApp>
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
