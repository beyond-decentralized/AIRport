import { resolveRelativePath } from '../../resolve/pathResolver';
export class EntityMappingBuilder {
    constructor(entityMappingsPath, pathBuilder) {
        this.entityMappingsPath = entityMappingsPath;
        this.pathBuilder = pathBuilder;
        this.entityMappings = [];
    }
    addEntity(entityIndex, entityName, relativePath) {
        this.entityMappings.push({
            entityIndex,
            entityName,
            relativePath,
        });
    }
    build(applicationDomain, applicationName) {
        const imports = [];
        const entityDefinitions = this.entityMappings.map(entityMapping => {
            const entityImportRelativePath = resolveRelativePath(this.entityMappingsPath, entityMapping.relativePath)
                .replace('.ts', '');
            imports.push(`import { ${entityMapping.entityName} } from '${entityImportRelativePath}';`);
            return `  accumulator.add(${entityMapping.entityName}, ${entityMapping.entityIndex});`;
        }).join('\n');
        return `/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
${imports.join('\n')}

DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('${applicationDomain}', '${applicationName}');
${entityDefinitions}
});
`;
    }
}
//# sourceMappingURL=EntityMappingBuilder.js.map