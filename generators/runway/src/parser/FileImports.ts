export interface FileImports {

	importMapByObjectAsName: { [objectAsName: string]: ModuleImport };
	importMapByModulePath: { [fileName: string]: ModuleImport };

}

export interface ModuleImport {

	fileImports: FileImports;
	isLocal: boolean;
	objectMapByAsName: { [objectAsName: string]: ImportedObject };
	path: string;

}

export interface ImportedObject {

	asName: string;
	moduleImport: ModuleImport;
	sourceName: string;

}

export interface EntityFile {
	path: string;
	hasEntityCandidate: boolean;
	hasEnums: boolean;
	hasInterfaces: boolean;
}