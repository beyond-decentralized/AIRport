import { UtilityBuilder } from './UtilityBuilder';
export class DaoBuilder extends UtilityBuilder {
    constructor(pathBuilder) {
        super(pathBuilder, 'Dao', false);
    }
    addImports() {
        super.addImports();
        this.addImport([
            'DaoQueryDecorators'
        ], '@airport/check-in');
    }
    buildStaticProperties(entityName) {
        return `
	
	static Find      = new DaoQueryDecorators<${entityName}ESelect>();
  static FindOne   = new DaoQueryDecorators<${entityName}ESelect>();
  static Search    = new DaoQueryDecorators<${entityName}ESelect>();
  static SearchOne = new DaoQueryDecorators<${entityName}ESelect>();`;
    }
}
//# sourceMappingURL=DaoBuilder.js.map