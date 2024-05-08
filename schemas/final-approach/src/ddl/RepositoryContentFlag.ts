import { Column, DbNumber, Entity, Table } from "@airport/tarmaq-entity";
import { RepositoryContentFlagType } from "./RepositoryContentFlagType";
import { AirEntity } from "./airEntity/AirEntity";

@Entity()
@Table({ name: 'REPOSITORY_CONTENT_FLAG' })
export class RepositoryContentFlag extends AirEntity {

    @Column({ name: 'FLAG_TYPE' })
    @DbNumber()
    flagType: RepositoryContentFlagType;

}
