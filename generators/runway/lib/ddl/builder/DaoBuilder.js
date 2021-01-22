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
	static SearchOne = new DaoQueryDecorators<${entityName}ESelect>();
	static Save(
		config: ${entityName}ESelect
	): PropertyDecorator {
		return Dao.BaseSave<${entityName}ESelect>(config);
  }`;
    }
}
//# sourceMappingURL=DaoBuilder.js.map