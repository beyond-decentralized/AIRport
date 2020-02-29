export class ImportManager {
    static resolveImports(sourceFile, filePath) {
        const importMapByObjectAsName = {};
        const importMapByModulePath = {};
        const fileImports = {
            importMapByObjectAsName,
            importMapByModulePath,
        };
        for (const anImport of sourceFile.imports) {
            const path = anImport.text;
            if (path.endsWith('../')) {
                throw new Error(`
Entity file source rule violation:
		File: ${filePath}
		
				Imports ending in a directory are not valid, 
				please import from a barrel or a file.
				
				NOTE: importing from the 'generated' barrel is not currently supported,
				please import from the specific generated files.
				
				NOTE: importing from the '.../index' file is not currently supported,
				please import from the specific generated files.
				
		Import:
			${path}
				
				`);
            }
            if (path.endsWith('./generated/generated')) {
                throw new Error(`
Entity file source rule violation:
		File: ${filePath}
		
				Importing from the 'generated' barrel is not currently supported,
				please import from the specific generated files.
				
		Import:
			${path}
				
				`);
            }
            if (path.endsWith('../index')) {
                throw new Error(`
Entity file source rule violation:
		File: ${filePath}
		
				Importing from the '.../index' file is not currently supported,
				please import from the specific generated files.
				
		Import:
			${path}
				
				`);
            }
            const isLocal = this.isLocalReference(path);
            const objectMapByAsName = {};
            const moduleImport = {
                fileImports,
                isLocal,
                objectMapByAsName,
                path,
            };
            importMapByModulePath[path] = moduleImport;
            const namedBindings = anImport.parent.importClause.namedBindings;
            if (!namedBindings || !namedBindings.elements) {
                continue;
            }
            for (const namedBinding of namedBindings.elements) {
                const asName = namedBinding.name.text;
                let sourceName = asName;
                if (namedBinding.propertyName) {
                    sourceName = namedBinding.propertyName.text;
                }
                const importedObject = {
                    asName,
                    moduleImport,
                    sourceName,
                };
                objectMapByAsName[asName] = importedObject;
                importMapByObjectAsName[asName] = moduleImport;
            }
        }
        return fileImports;
    }
    static isLocalReference(path) {
        return path.startsWith('.');
    }
}
//# sourceMappingURL=ImportManager.js.map