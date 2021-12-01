/* eslint-disable */
import {
	IAddress,
} from './address';
import {
	AddressESelect,
	AddressECreateColumns,
	AddressECreateProperties,
	AddressEUpdateColumns,
	AddressEUpdateProperties,
	AddressEId,
	AddressGraph,
	QAddress,
} from './qaddress';
import {
	ILanguage,
} from './language';
import {
	LanguageESelect,
	LanguageECreateColumns,
	LanguageECreateProperties,
	LanguageEUpdateColumns,
	LanguageEUpdateProperties,
	LanguageEId,
	LanguageGraph,
	QLanguage,
} from './qlanguage';
import {
	ITranslationType,
} from './translationtype';
import {
	TranslationTypeESelect,
	TranslationTypeECreateColumns,
	TranslationTypeECreateProperties,
	TranslationTypeEUpdateColumns,
	TranslationTypeEUpdateProperties,
	TranslationTypeEId,
	TranslationTypeGraph,
	QTranslationType,
} from './qtranslationtype';
import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Dao,
	DaoQueryDecorators,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseAddressDao
  extends IDao<IAddress, AddressESelect, AddressECreateProperties, AddressEUpdateColumns, AddressEUpdateProperties, AddressEId, AddressGraph, QAddress> {
}

export class BaseAddressDao
  extends SQDIDao<IAddress, AddressESelect, AddressECreateProperties, AddressEUpdateColumns, AddressEUpdateProperties, AddressEId, AddressGraph, QAddress>
	implements IBaseAddressDao {
	
	static Find      = new DaoQueryDecorators<AddressESelect>();
	static FindOne   = new DaoQueryDecorators<AddressESelect>();
	static Search    = new DaoQueryDecorators<AddressESelect>();
	static SearchOne = new DaoQueryDecorators<AddressESelect>();
	static Save(
		config: AddressGraph
	): PropertyDecorator {
		return Dao.BaseSave<AddressGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseLanguageDao
  extends IDao<ILanguage, LanguageESelect, LanguageECreateProperties, LanguageEUpdateColumns, LanguageEUpdateProperties, LanguageEId, LanguageGraph, QLanguage> {
}

export class BaseLanguageDao
  extends SQDIDao<ILanguage, LanguageESelect, LanguageECreateProperties, LanguageEUpdateColumns, LanguageEUpdateProperties, LanguageEId, LanguageGraph, QLanguage>
	implements IBaseLanguageDao {
	
	static Find      = new DaoQueryDecorators<LanguageESelect>();
	static FindOne   = new DaoQueryDecorators<LanguageESelect>();
	static Search    = new DaoQueryDecorators<LanguageESelect>();
	static SearchOne = new DaoQueryDecorators<LanguageESelect>();
	static Save(
		config: LanguageGraph
	): PropertyDecorator {
		return Dao.BaseSave<LanguageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTranslationTypeDao
  extends IDao<ITranslationType, TranslationTypeESelect, TranslationTypeECreateProperties, TranslationTypeEUpdateColumns, TranslationTypeEUpdateProperties, TranslationTypeEId, TranslationTypeGraph, QTranslationType> {
}

export class BaseTranslationTypeDao
  extends SQDIDao<ITranslationType, TranslationTypeESelect, TranslationTypeECreateProperties, TranslationTypeEUpdateColumns, TranslationTypeEUpdateProperties, TranslationTypeEId, TranslationTypeGraph, QTranslationType>
	implements IBaseTranslationTypeDao {
	
	static Find      = new DaoQueryDecorators<TranslationTypeESelect>();
	static FindOne   = new DaoQueryDecorators<TranslationTypeESelect>();
	static Search    = new DaoQueryDecorators<TranslationTypeESelect>();
	static SearchOne = new DaoQueryDecorators<TranslationTypeESelect>();
	static Save(
		config: TranslationTypeGraph
	): PropertyDecorator {
		return Dao.BaseSave<TranslationTypeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}
