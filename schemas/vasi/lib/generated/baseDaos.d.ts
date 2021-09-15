import { IAddress } from './address';
import { AddressESelect, AddressECreateProperties, AddressEUpdateColumns, AddressEUpdateProperties, AddressEId, AddressGraph, QAddress } from './qaddress';
import { ILanguage } from './language';
import { LanguageESelect, LanguageECreateProperties, LanguageEUpdateColumns, LanguageEUpdateProperties, LanguageEId, LanguageGraph, QLanguage } from './qlanguage';
import { ITranslationType } from './translationtype';
import { TranslationTypeESelect, TranslationTypeECreateProperties, TranslationTypeEUpdateColumns, TranslationTypeEUpdateProperties, TranslationTypeEId, TranslationTypeGraph, QTranslationType } from './qtranslationtype';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseAddressDao extends IDao<IAddress, AddressESelect, AddressECreateProperties, AddressEUpdateColumns, AddressEUpdateProperties, AddressEId, AddressGraph, QAddress> {
}
export declare class BaseAddressDao extends SQDIDao<IAddress, AddressESelect, AddressECreateProperties, AddressEUpdateColumns, AddressEUpdateProperties, AddressEId, AddressGraph, QAddress> implements IBaseAddressDao {
    static Find: DaoQueryDecorators<AddressESelect>;
    static FindOne: DaoQueryDecorators<AddressESelect>;
    static Search: DaoQueryDecorators<AddressESelect>;
    static SearchOne: DaoQueryDecorators<AddressESelect>;
    static Save(config: AddressGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseLanguageDao extends IDao<ILanguage, LanguageESelect, LanguageECreateProperties, LanguageEUpdateColumns, LanguageEUpdateProperties, LanguageEId, LanguageGraph, QLanguage> {
}
export declare class BaseLanguageDao extends SQDIDao<ILanguage, LanguageESelect, LanguageECreateProperties, LanguageEUpdateColumns, LanguageEUpdateProperties, LanguageEId, LanguageGraph, QLanguage> implements IBaseLanguageDao {
    static Find: DaoQueryDecorators<LanguageESelect>;
    static FindOne: DaoQueryDecorators<LanguageESelect>;
    static Search: DaoQueryDecorators<LanguageESelect>;
    static SearchOne: DaoQueryDecorators<LanguageESelect>;
    static Save(config: LanguageGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTranslationTypeDao extends IDao<ITranslationType, TranslationTypeESelect, TranslationTypeECreateProperties, TranslationTypeEUpdateColumns, TranslationTypeEUpdateProperties, TranslationTypeEId, TranslationTypeGraph, QTranslationType> {
}
export declare class BaseTranslationTypeDao extends SQDIDao<ITranslationType, TranslationTypeESelect, TranslationTypeECreateProperties, TranslationTypeEUpdateColumns, TranslationTypeEUpdateProperties, TranslationTypeEId, TranslationTypeGraph, QTranslationType> implements IBaseTranslationTypeDao {
    static Find: DaoQueryDecorators<TranslationTypeESelect>;
    static FindOne: DaoQueryDecorators<TranslationTypeESelect>;
    static Search: DaoQueryDecorators<TranslationTypeESelect>;
    static SearchOne: DaoQueryDecorators<TranslationTypeESelect>;
    static Save(config: TranslationTypeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map