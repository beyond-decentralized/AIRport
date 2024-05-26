import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import { DdlApplication } from "@airport/airspace/dist/app/bundle";
import { Repository } from './Repository'
import { IRepositoryApplication } from "@airport/ground-control";

@Entity()
@Table({
	name: "REPOSITORY_APPLICATIONS"
})
export class RepositoryApplication
	implements IRepositoryApplication {

	@Id()
	@ManyToOne()
	@JoinColumn({ name: "DB_APPLICATION_INDEX", nullable: false })
	application: DdlApplication;

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'REPOSITORY_LID', nullable: false })
	repository: Repository;

}
