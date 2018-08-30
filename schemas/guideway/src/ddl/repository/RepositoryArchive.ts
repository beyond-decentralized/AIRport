import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-control'
import {Archive}    from "./Archive";
import {Repository} from "./Repository";


@Entity()
@Table({name: "REPOSITORY_ARCHIVE"})
export class RepositoryArchive {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID", nullable: false})
	repository: Repository;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "ARCHIVE_ID", referencedColumnName: "ID", nullable: false})
	archive: Archive;

}