import { Classification_Id, Classification_Name } from '@airport/ground-control'
import {
    Column,
    DbNumber,
    DbString,
    Entity,
    Id,
    Table
} from '@airport/tarmaq-entity'

/**
 * Classification of Generic Types (which can be applied to any entities)
 */
@Entity()
@Table({
    name: 'CLASSIFICATIONS'
})
export class Classification {

    @Id()
    @Column({ name: 'CLASSIFICATION_ID', nullable: false })
    @DbNumber()
    id?: Classification_Id

    @Column({ name: 'NAME', nullable: false })
    @DbString()
    name?: Classification_Name

}
