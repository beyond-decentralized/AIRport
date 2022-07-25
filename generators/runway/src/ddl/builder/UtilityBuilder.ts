import { ImplementationFileBuilder } from './ImplementationFileBuilder';
import { PathBuilder } from './PathBuilder';

export abstract class UtilityBuilder
	extends ImplementationFileBuilder {

	private diSet;

	constructor(
		pathBuilder: PathBuilder,
		private classSuffix: string,
		needsQEntity: boolean
	) {
		super('base' + classSuffix + 's', pathBuilder);

		this.diSet = needsQEntity ? 'diSet' : 'duoDiSet';
	}

	build(): string {
		this.entityNames.sort();
		const baseClassDefinitions = this.buildBaseClassDefinitions();

		const imports = this.buildImports();

		return `/* eslint-disable */
${imports}

// Application Q object Dependency Injection readiness detection ${this.classSuffix}
export class SQDI${this.classSuffix}<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends ${this.classSuffix}<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		ApplicationEntity_LocalId,
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
				], `${this.pathBuilder.prefixToFileName(this.generatedPathMapByEntityName[entityName], 'q')}`);
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
			`I${this.classSuffix}`,
			`${this.classSuffix}`
		], '@airport/tarmaq-dao');
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
