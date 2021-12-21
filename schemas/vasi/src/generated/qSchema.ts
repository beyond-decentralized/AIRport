import {
	AIRPORT_DATABASE,
	QApplication as AirportQApplication
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbApplication,
	EntityId,
	getFullApplicationName
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

export interface LocalQApplication extends AirportQApplication {

  db: DbApplication;

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

export const Q_SCHEMA: LocalQApplication = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/vasi'
};
export const Q: LocalQApplication = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbApplication__, dbEntityId)
}

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getFullApplicationName(Q_SCHEMA)] = Q
})
