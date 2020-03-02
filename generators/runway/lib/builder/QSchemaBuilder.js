"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../resolve/pathResolver");
class QSchemaBuilder {
    constructor(pathBuilder) {
        this.pathBuilder = pathBuilder;
        this.entityNames = [];
        this.ddlPathMapByEntityName = {};
        this.generatedFilePaths = [];
        this.generatedPathMapByEntityName = {};
        this.qSchemaFilePath = pathBuilder.fullGeneratedDirPath + '/qSchema.ts';
    }
    addFileNameAndPaths(entityName, fullDdlPath, fullGenerationPath) {
        const ddlRelativePath = pathResolver_1.resolveRelativePath(this.qSchemaFilePath, fullDdlPath)
            .replace('.ts', '');
        this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
        const generatedRelativePath = pathResolver_1.resolveRelativePath(this.qSchemaFilePath, fullGenerationPath)
            .replace('.ts', '');
        this.generatedFilePaths.push(generatedRelativePath);
        this.generatedPathMapByEntityName[entityName]
            = this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
        this.entityNames.push(entityName);
    }
    build(domainName, schemaName) {
        this.entityNames.sort();
        this.generatedFilePaths.sort();
        const qApiDefinitions = this.entityNames.map(entityName => `${entityName}: Q${entityName};`).join('\n\t');
        // TODO: enable DUO and DAO injections into QSchema, if needed
        // const duoDefinitions = this.entityNames.map(
        // 	entityName => `${entityName}: IBase${entityName}Duo;`
        // ).join('\n\t\t');
        // const daoDefinitions = this.entityNames.map(
        // 	entityName => `${entityName}: IBase${entityName}Dao;`
        // ).join('\n\t\t');
        const constructorDefinitions = this.entityNames.map(entityName => `${entityName}: ${entityName}`).join(',\n\t');
        const qEntityImports = this.entityNames.map(entityName => `import { ${entityName} } from '${this.ddlPathMapByEntityName[entityName]}';
import { Q${entityName} } from '${this.generatedPathMapByEntityName[entityName]}';`).join('\n');
        // const iDuoImports = this.entityNames.map(
        // 	entityName =>
        // 		`IBase${entityName}Duo`
        // ).join(',\n\t');
        // const iDaoImports = this.entityNames.map(
        // 	entityName =>
        // 		`IBase${entityName}Dao`
        // ).join(',\n\t');
        // import {
        // 	${iDuoImports}
        // } from './baseDuos';
        //
        // import {
        // 	${iDaoImports}
        // } from './baseDaos';
        // duo: {
        // 	${duoDefinitions}
        // }
        //
        // dao: {
        // 	${daoDefinitions}
        // }
        return `import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
${qEntityImports}

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	${qApiDefinitions}

}

const __constructors__ = {
	${constructorDefinitions}
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__,
  domain: '${domainName}',
  name: '${schemaName}'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbSchema__, dbEntityId)
}

DI.db().get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
`;
    }
}
exports.QSchemaBuilder = QSchemaBuilder;
//# sourceMappingURL=QSchemaBuilder.js.map