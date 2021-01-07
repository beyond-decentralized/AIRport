import { PathBuilder }    from './PathBuilder';
import { UtilityBuilder } from './UtilityBuilder';

export class DaoBuilder
	extends UtilityBuilder {

	constructor(
		pathBuilder: PathBuilder
	) {
		super(pathBuilder, 'Dao', false);
	}

	protected addImports() {
		super.addImports();
		this.addImport([
			'DaoQueryDecorators'
		], '@airport/check-in');
	}

	protected buildStaticProperties(
		entityName: string
	): string {
		return `
	
	static Find      = new DaoQueryDecorators<${entityName}ESelect>();
  static FindOne   = new DaoQueryDecorators<${entityName}ESelect>();
  static Search    = new DaoQueryDecorators<${entityName}ESelect>();
  static SearchOne = new DaoQueryDecorators<${entityName}ESelect>();`;
	}

}
