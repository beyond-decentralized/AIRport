import { IBuilder } from "../../ddl/builder/Builder";
import { FileBuilder } from "../../ddl/builder/entity/FileBuilder";
import { PathBuilder } from "../../ddl/builder/PathBuilder";

export class ApiProxySuperclassBuilder
    extends FileBuilder
    implements IBuilder {

    constructor(
        pathBuilder: PathBuilder
    ) {
        super(null, null, pathBuilder, null);
        this.fullGenerationPath = pathBuilder.fullGeneratedDirPath
            + `/api/ApiProxy.ts`;
    }

    addImports() {
    }

    build(): string {
        return `import { application } from "../../to_be_generated/app-declaration"

        export abstract class ApiProxy<Api> {
        
            _initialized = false
            _proxy: Api
        
            get proxy(): Api {
                if (!this._initialized) {
                    this._initialized = true
                    globalThis.DEPENDENCY_INJECTION.db().manualInject(this, '_proxy',
                        application, this)
                }
        
                return this._proxy
            }
        
        }`
    }
}