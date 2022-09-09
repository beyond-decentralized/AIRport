import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QClassification } from './query/type/QClassification';
import { QClient } from './query/client/QClient';
import { QClientType } from './query/client/QClientType';
import { QContinent } from './query/locality/QContinent';
import { QCountry } from './query/locality/QCountry';
import { QDatabase } from './query/database/QDatabase';
import { QDatabaseType } from './query/database/QDatabaseType';
import { QMetroArea } from './query/locality/QMetroArea';
import { QMetroAreaState } from './query/locality/QMetroAreaState';
import { QState } from './query/locality/QState';
import { QTerminal } from './query/terminal/QTerminal';
import { QTerminalType } from './query/terminal/QTerminalType';
import { QType } from './query/type/QType';
import { QTypeClassification } from './query/type/QTypeClassification';
import { QUserAccount } from './query/QUserAccount';
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
