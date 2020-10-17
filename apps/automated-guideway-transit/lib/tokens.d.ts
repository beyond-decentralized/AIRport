import { ILoggedPackage } from '@airport/approach-lighting-system';
import { IBlacklist, ISyncConnectionVerifier } from '@airport/arrivals-n-departures';
import { ITuningSettings } from './model/TuningSettings';
import { IErrorLogger } from './server/common/ErrorLogger';
import { ISyncConnectionProcessor } from './server/sync/SyncConnectionProcessor';
export declare const TUNNING_SETTINGS: import("@airport/di").IDiToken<ITuningSettings>;
export declare const ERROR_LOGGER: import("@airport/di").IDiToken<IErrorLogger>;
export declare const SYNC_CONNECTION_PROCESSOR: import("@airport/di").IDiToken<ISyncConnectionProcessor>;
export declare const SYNC_CONNECTION_VERIFIER: import("@airport/di").IDiToken<ISyncConnectionVerifier>;
export declare const BLACKLIST: import("@airport/di").IDiToken<IBlacklist<any>>;
export declare const AGTLogger: ILoggedPackage;
//# sourceMappingURL=tokens.d.ts.map