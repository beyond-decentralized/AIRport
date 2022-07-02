import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/air-traffic-control'
import { Classification } from './Classification'
import { Type } from './Type'

@Entity()
@Table({
    name: 'TYPE_CLASSIFICATIONS'
})
export class TypeClassification {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'CLASSIFICATION_ID', referencedColumnName: 'ID' })
    classification: Classification

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TYPE_ID', referencedColumnName: 'ID' })
    type: Type

}
