import {
	AIRPORT_DATABASE,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
import { QAddress } from './qaddress';
import { QAgeSuitable } from './attributes/qagesuitable';
import { QImmutable } from './attributes/qimmutable';
import { QImmutableWithActor } from './attributes/qimmutablewithactor';
import { QLanguage } from './qlanguage';
import { QMutable } from './attributes/qmutable';
import { QMutableWithActor } from './attributes/qmutablewithactor';
import { QSystemGenerated } from './attributes/qsystemgenerated';
import { QTranslationType } from './qtranslationtype';
import {
  Address,
  AgeSuitable,
  Immutable,
  ImmutableWithActor,
  Language,
  Mutable,
  MutableWithActor,
  SystemGenerated,
  TranslationType
} from '../ddl/ddl';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	Address: QAddress;
	Language: QLanguage;
	TranslationType: QTranslationType;

}

const __constructors__ = {
	Address: Address,
	AgeSuitable: AgeSuitable,
	Immutable: Immutable,
	ImmutableWithActor: ImmutableWithActor,
	Language: Language,
	Mutable: Mutable,
	MutableWithActor: MutableWithActor,
	SystemGenerated: SystemGenerated,
	TranslationType: TranslationType
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/vasi'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbSchema__, dbEntityId)
}

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
