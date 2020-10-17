export class FileBuilder {
    constructor(entity, fullGenerationPath, pathBuilder, configuration) {
        this.entity = entity;
        this.fullGenerationPath = fullGenerationPath;
        this.pathBuilder = pathBuilder;
        this.configuration = configuration;
        this.importMap = {};
    }
    addImport(classNames, filePath, toLowerCase = true) {
        filePath = filePath.replace('.ts', '');
        if (toLowerCase) {
            const filePathFragments = filePath.split('/');
            if (filePathFragments.length) {
                let lastFragment = filePathFragments[filePathFragments.length - 1];
                lastFragment = lastFragment.toLowerCase();
                filePathFragments[filePathFragments.length - 1] = lastFragment;
            }
            filePath = filePathFragments.join('/');
        }
        let fileImportMap = this.importMap[filePath];
        if (!fileImportMap) {
            fileImportMap = {};
            this.importMap[filePath] = fileImportMap;
        }
        classNames.forEach(className => {
            let existingImport;
            let asName;
            let sourceName;
            if (typeof className === 'string') {
                asName = className;
                sourceName = className;
            }
            else {
                asName = className.asName;
                sourceName = className.sourceName;
            }
            let existingSourceName = fileImportMap[asName];
            if (existingSourceName) {
                if (existingSourceName !== sourceName) {
                    throw new Error(`Cannot import '${sourceName}' as '${asName}' from ${filePath}.
					'${existingSourceName}' is already imported as '${asName}' from this path.`);
                }
                return;
            }
            else {
                fileImportMap[asName] = sourceName;
            }
        });
    }
    buildImports() {
        this.addImports();
        let imports = ``;
        for (let filePath in this.importMap) {
            const fileImportMap = this.importMap[filePath];
            let importedObjects = [];
            for (let asName in fileImportMap) {
                let sourceName = fileImportMap[asName];
                if (sourceName === asName) {
                    importedObjects.push(sourceName);
                }
                else {
                    importedObjects.push(`${sourceName} as ${asName}`);
                }
            }
            imports += `import {\n\t${importedObjects.join(',\n\t')},\n} from '${filePath}';\n`;
        }
        return imports;
    }
}
//# sourceMappingURL=FileBuilder.js.map