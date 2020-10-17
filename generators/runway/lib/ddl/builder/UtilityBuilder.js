import { ImplementationFileBuilder } from './ImplementationFileBuilder';
export class UtilityBuilder extends ImplementationFileBuilder {
    constructor(pathBuilder, classSuffix, needsQEntity) {
        super('base' + classSuffix + 's', pathBuilder);
        this.classSuffix = classSuffix;
        this.diSet = needsQEntity ? 'diSet' : 'duoDiSet';
    }
    build() {
        this.entityNames.sort();
        const baseClassDefinitions = this.entityNames.map(entityName => `
export interface IBase${entityName}${this.classSuffix}
  extends I${this.classSuffix}<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, ${entityName}Graph, Q${entityName}> {
}

export class Base${entityName}${this.classSuffix}
  extends SQDI${this.classSuffix}<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, ${entityName}Graph, Q${entityName}>
	implements IBase${entityName}${this.classSuffix} {

	static diSet(): boolean {
		return ${this.diSet}(${this.entityIdMapByName[entityName]})
	}
	
	constructor() {
		super(${this.entityIdMapByName[entityName]})
	}
}
`).join('\n');
        const imports = this.entityNames.map(entityName => `import {
	I${entityName}
} from '${this.generatedPathMapByEntityName[entityName]}'
import {
	${entityName}ESelect,
	${entityName}ECreateColumns,
	${entityName}ECreateProperties,
	${entityName}EUpdateColumns,
	${entityName}EUpdateProperties,
	${entityName}EId,
	${entityName}Graph,
	Q${entityName}
} from '${this.pathBuilder.prefixQToFileName(this.generatedPathMapByEntityName[entityName])}'`).join('\n');
        return `import {
	I${this.classSuffix},
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { ${this.classSuffix} } from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	${this.diSet}
} from './qSchema'
${imports}


// Schema Q object Dependency Injection readiness detection ${this.classSuffix}
export class SQDI${this.classSuffix}<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends ${this.classSuffix}<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
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
}
//# sourceMappingURL=UtilityBuilder.js.map