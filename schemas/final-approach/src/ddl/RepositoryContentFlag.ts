import { Column, DbNumber, Entity, Table } from "@airport/tarmaq-entity";
import { AirEntity } from "./AirEntity";
import { RepositoryContentFlagType } from "./RepositoryContentFlagType";

@Entity()
@Table({ name: 'REPOSITORY_CONTENT_FLAG' })
export class RepositoryContentFlag extends AirEntity {

    @Column({ name: 'FLAG_TYPE' })
    @DbNumber()
    flagType: RepositoryContentFlagType;

}
