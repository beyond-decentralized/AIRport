"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../resolve/pathResolver");
class DmoBuilder {
    constructor(pathBuilder) {
        this.pathBuilder = pathBuilder;
        this.entityNames = [];
        this.ddlPathMapByEntityName = {};
        this.generatedPathMapByEntityName = {};
        this.daoListingFilePath = pathBuilder.fullGeneratedDirPath + '/baseDmos.ts';
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
export interface IBase${entityName}Dmo
  extends IDmo<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}> {
}

export class Base${entityName}Dmo
  extends Dmo<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}>
	implements IBase${entityName}Dmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['${entityName}']);
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
        return `import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { Q } from './qSchema';
${imports}

${daoDefinitions}`;
    }
}
exports.DmoBuilder = DmoBuilder;
//# sourceMappingURL=DmoBuilder.js.map