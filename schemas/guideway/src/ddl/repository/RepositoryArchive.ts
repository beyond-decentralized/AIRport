import {
	Entity,
	JoinColumn,
	ManyToOne,
	Table
}                   from "@airport/air-control";
import {Archive}    from "./Archive";
import {Repository} from "./Repository";


@Entity()
@Table({name: "REPOSITORY_ARCHIVE"})
export class RepositoryArchive {

	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: Repository;

	@ManyToOne()
	@JoinColumn({name: "ARCHIVE_ID", referencedColumnName: "ID"})
	archive: Archive;

}