import { IAddress } from './address';
import { AddressESelect, AddressECreateProperties, AddressEUpdateColumns, AddressEUpdateProperties, AddressEId, AddressGraph, QAddress } from './qaddress';
import { ILanguage } from './language';
import { LanguageESelect, LanguageECreateProperties, LanguageEUpdateColumns, LanguageEUpdateProperties, LanguageEId, LanguageGraph, QLanguage } from './qlanguage';
import { ITranslationType } from './translationtype';
import { TranslationTypeESelect, TranslationTypeECreateProperties, TranslationTypeEUpdateColumns, TranslationTypeEUpdateProperties, TranslationTypeEId, TranslationTypeGraph, QTranslationType } from './qtranslationtype';
import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseAddressDuo extends IDuo<IAddress, AddressESelect, AddressECreateProperties, AddressEUpdateColumns, AddressEUpdateProperties, AddressEId, AddressGraph, QAddress> {
}
export declare class BaseAddressDuo extends SQDIDuo<IAddress, AddressESelect, AddressECreateProperties, AddressEUpdateColumns, AddressEUpdateProperties, AddressEId, AddressGraph, QAddress> implements IBaseAddressDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLanguageDuo extends IDuo<ILanguage, LanguageESelect, LanguageECreateProperties, LanguageEUpdateColumns, LanguageEUpdateProperties, LanguageEId, LanguageGraph, QLanguage> {
}
export declare class BaseLanguageDuo extends SQDIDuo<ILanguage, LanguageESelect, LanguageECreateProperties, LanguageEUpdateColumns, LanguageEUpdateProperties, LanguageEId, LanguageGraph, QLanguage> implements IBaseLanguageDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTranslationTypeDuo extends IDuo<ITranslationType, TranslationTypeESelect, TranslationTypeECreateProperties, TranslationTypeEUpdateColumns, TranslationTypeEUpdateProperties, TranslationTypeEId, TranslationTypeGraph, QTranslationType> {
}
export declare class BaseTranslationTypeDuo extends SQDIDuo<ITranslationType, TranslationTypeESelect, TranslationTypeECreateProperties, TranslationTypeEUpdateColumns, TranslationTypeEUpdateProperties, TranslationTypeEId, TranslationTypeGraph, QTranslationType> implements IBaseTranslationTypeDuo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDuos.d.ts.map