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
    build(schemaDomain, schemaName) {
        const imports = [];
        const entityDefinitions = this.entityMappings.map(entityMapping => {
            const entityImportRelativePath = resolveRelativePath(this.entityMappingsPath, entityMapping.relativePath)
                .replace('.ts', '');
            imports.push(`import { ${entityMapping.entityName} } from '${entityImportRelativePath}';`);
            return `  accumulator.add(${entityMapping.entityName}, ${entityMapping.entityIndex});`;
        }).join('\n');
        return `import { AIR_DB } from '@airport/air-control';
import { DI } from '@airport/di';
${imports.join('\n')}

DI.db().get(AIR_DB).then(airDb => {
  const accumulator = airDb.getAccumulator('${schemaDomain}', '${schemaName}');
${entityDefinitions}
});
`;
    }
}
//# sourceMappingURL=EntityMappingBuilder.js.map