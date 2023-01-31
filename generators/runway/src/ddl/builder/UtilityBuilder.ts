import { ImplementationFileBuilder } from './ImplementationFileBuilder';
import { PathBuilder } from './PathBuilder';

export abstract class UtilityBuilder
	extends ImplementationFileBuilder {

	private diSet;

	constructor(
		applicationFullName: string,
		pathBuilder: PathBuilder,
		private classSuffix: string,
	) {
		super('base' + classSuffix + 's', pathBuilder);

		// this.diSet = needsQEntity ? 'diSet' : 'duoDiSet';
		this.diSet = applicationFullName + '_diSet';
	}

	build(): string {
		this.entityNames.sort();
		const baseClassDefinitions = this.buildBaseClassDefinitions();

		const imports = this.buildImports();

		return `/* eslint-disable */
${imports}
import Q from './qApplication'

// Application Q object Dependency Injection readiness detection ${this.classSuffix}
export class SQDI${this.classSuffix}<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	DbEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends ${this.classSuffix}<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		DbEntity_LocalId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}

${baseClassDefinitions}`;
	}

	protected addImports() {
		this.entityNames.forEach(
			entityName => {
				this.addImport([
					`${entityName}`
				], `${this.ddlPathMapByEntityName[entityName]}`);
				this.addImport([
					`${entityName}ESelect`,
					`${entityName}ECreateColumns`,
					`${entityName}ECreateProperties`,
					`${entityName}EUpdateColumns`,
					`${entityName}EUpdateProperties`,
					`${entityName}EId`,
					`${entityName}Graph`,
					`Q${entityName}`
				], `${this.generatedPathMapByEntityName[entityName]}`);
			});

		this.addImport([
			'IEntityCascadeGraph',
			'IEntityCreateProperties',
			'IEntityIdProperties',
			'IEntitySelectProperties',
			'IEntityUpdateColumns',
			'IEntityUpdateProperties',
			'IQEntity'
		], '@airport/tarmaq-query');
		this.addImport([
			`${this.classSuffix}`
		], '@airport/tarmaq-dao');
		this.addImport([
			{
				asName: 'DbEntityId',
				sourceName: 'DbEntity_LocalId'
			}
		], '@airport/ground-control');
		this.addImport([
			`${this.diSet}`
		], './qApplication');
	}

	protected buildBaseClassDefinitions(): string {
		return this.entityNames.map(
			entityName => `
export interface IBase${entityName}${this.classSuffix}
  extends I${this.classSuffix}<${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, ${entityName}Graph, Q${entityName}> {
}

export class Base${entityName}${this.classSuffix}
  extends SQDI${this.classSuffix}<${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, ${entityName}Graph, Q${entityName}>
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

	protected buildStaticProperties(
		entityName: string
	): string {
		return '';
	}

}
