import {AgtRepositoryId} from "@airport/arrivals-n-departures";
import {
	ArchiveLocation,
	RepositoryName
}                        from "@airport/guideway";

export interface ArchiveInfo {

	repositoryId: AgtRepositoryId;
	repositoryName: RepositoryName;
	location: ArchiveLocation;
	year: number;
	month: number;
	date: number;

}