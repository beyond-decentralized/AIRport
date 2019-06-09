"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImplementationFileBuilder_1 = require("./ImplementationFileBuilder");
class DuoBuilder extends ImplementationFileBuilder_1.ImplementationFileBuilder {
    constructor(pathBuilder) {
        super('baseDuos', pathBuilder);
    }
    build() {
        this.entityNames.sort();
        const daoDefinitions = this.entityNames.map(entityName => `
export interface IBase${entityName}Duo
  extends IDuo<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}> {
}

export class Base${entityName}Duo
  extends SQDIDuo<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}>
	implements IBase${entityName}Duo {

	static diSet(): boolean {
		return diSet(${this.entityIdMapByName[entityName]})
	}
	
	constructor() {
		super(${this.entityIdMapByName[entityName]})
	}
}
`).join('\n');
        const imports = this.entityNames.map(entityName => `import {
	I${entityName},
	${entityName}ESelect,
	${entityName}ECreateColumns,
	${entityName}ECreateProperties,
	${entityName}EUpdateColumns,
	${entityName}EUpdateProperties,
	${entityName}EId,
	Q${entityName}
} from '${this.generatedPathMapByEntityName[entityName]}'`).join('\n');
        return `import {
	IDuo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from "@airport/check-in"
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	diSet
} from './qSchema'
${imports}


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}

${daoDefinitions}`;
    }
}
exports.DuoBuilder = DuoBuilder;
//# sourceMappingURL=DuoBuilder.js.map