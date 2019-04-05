"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../resolve/pathResolver");
class DaoBuilder {
    constructor(pathBuilder) {
        this.pathBuilder = pathBuilder;
        this.entityNames = [];
        this.ddlPathMapByEntityName = {};
        this.generatedPathMapByEntityName = {};
        this.daoListingFilePath = pathBuilder.fullGeneratedDirPath + '/baseDaos.ts';
    }
    addFileNameAndPaths(entityName, fullDdlPath, fullGenerationPath) {
        const ddlRelativePath = pathResolver_1.resolveRelativePath(this.daoListingFilePath, fullDdlPath)
            .replace('.ts', '');
        this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
        const generatedRelativePath = pathResolver_1.resolveRelativePath(this.daoListingFilePath, fullGenerationPath)
            .replace('.ts', '');
        this.generatedPathMapByEntityName[entityName]
            = this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
        this.entityNames.push(entityName);
    }
    build() {
        this.entityNames.sort();
        const daoDefinitions = this.entityNames.map(entityName => `
export interface IBase${entityName}Dao
  extends IDao<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}> {
}

export class Base${entityName}Dao
  extends SQDIDao<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}>
	implements IBase${entityName}Dao {
	constructor() {
		super('${entityName}', Q)
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
} from '${this.generatedPathMapByEntityName[entityName]}';`).join('\n');
        return `import {
	IDao,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	IUtils,
	QSchema as ACQSchema
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
${imports}

// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	static diSet(): boolean {
		return Q.db as any
	}

	constructor(
		dbEntityName: string,
		qSchema: ACQSchema
	) {
		super(dbEntityName, qSchema)
	}
}

${daoDefinitions}`;
    }
}
exports.DaoBuilder = DaoBuilder;
//# sourceMappingURL=DaoBuilder.js.map