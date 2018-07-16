import {
	Entity,
	Id,
	Table
} from "@airport/air-control";

export type ArchiveId = string;
export type ArchiveLocation = string;

@Entity()
@Table({name: "ARCHIVES"})
export class Archive {

	@Id()
	id: ArchiveId;

	location: ArchiveLocation;

}