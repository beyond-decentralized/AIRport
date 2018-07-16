import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { Repository } from "@airport/holding-pattern";
import { SyncPriority } from "@airport/holding-pattern/lib/ddl/repository/SyncPrority";
import { RepositorySyncStatus } from "@airport/terminal-map";
import { SharingNode } from "./SharingNode";
export declare type SharingNodeRepositorySyncPriority = number;
export declare class SharingNodeRepository {
    sharingNode: SharingNode;
    repository: Repository;
    agtRepositoryId: AgtRepositoryId;
    advisedSyncPriority: SyncPriority;
    repositorySyncStatus: RepositorySyncStatus;
}
