import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QClassification } from './type/qclassification';
import { QClient } from './client/qclient';
import { QClientType } from './client/qclienttype';
import { QContinent } from './locality/qcontinent';
import { QCountry } from './locality/qcountry';
import { QDatabase } from './database/qdatabase';
import { QDatabaseType } from './database/qdatabasetype';
import { QMetroArea } from './locality/qmetroarea';
import { QMetroAreaState } from './locality/qmetroareastate';
import { QState } from './locality/qstate';
import { QTerminal } from './terminal/qterminal';
import { QTerminalType } from './terminal/qterminaltype';
import { QType } from './type/qtype';
import { QTypeClassification } from './type/qtypeclassification';
import { QUserAccount } from './quseraccount';
import {
  Classification,
  Client,
  ClientType,
  Continent,
  Country,
  Database,
  DatabaseType,
  MetroArea,
  MetroAreaState,
  State,
  Terminal,
  TerminalType,
  Type,
  TypeClassification,
  UserAccount
} from '../ddl/ddl';

export interface air____at_airport_slash_travel_dash_document_dash_checkpoint_LocalQApp extends QApp {

    db: DbApplication;

  Classification: QClassification;
	Client: QClient;
	ClientType: QClientType;
	Continent: QContinent;
	Country: QCountry;
	Database: QDatabase;
	DatabaseType: QDatabaseType;
	MetroArea: QMetroArea;
	MetroAreaState: QMetroAreaState;
	State: QState;
	Terminal: QTerminal;
	TerminalType: QTerminalType;
	Type: QType;
	TypeClassification: QTypeClassification;
	UserAccount: QUserAccount;

}

const __constructors__ = {
	Classification: Classification,
	Client: Client,
	ClientType: ClientType,
	Continent: Continent,
	Country: Country,
	Database: Database,
	DatabaseType: DatabaseType,
	MetroArea: MetroArea,
	MetroAreaState: MetroAreaState,
	State: State,
	Terminal: Terminal,
	TerminalType: TerminalType,
	Type: Type,
	TypeClassification: TypeClassification,
	UserAccount: UserAccount
};

export const Q_air____at_airport_slash_travel_dash_document_dash_checkpoint: air____at_airport_slash_travel_dash_document_dash_checkpoint_LocalQApp = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/travel-document-checkpoint'
};
export default Q_air____at_airport_slash_travel_dash_document_dash_checkpoint

export function air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q_air____at_airport_slash_travel_dash_document_dash_checkpoint.__dbApplication__, dbEntityId)
}

airApi.setQApp(Q_air____at_airport_slash_travel_dash_document_dash_checkpoint)
