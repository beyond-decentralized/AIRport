import { ITypeClassification } from '@airport/ground-control'
import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/tarmaq-entity'
import { Classification } from './Classification'
import { Type } from './Type'

@Entity()
@Table({
    name: 'TYPE_CLASSIFICATIONS'
})
export class TypeClassification
    implements ITypeClassification {

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'CLASSIFICATION_ID',
        referencedColumnName: 'CLASSIFICATION_ID'
    })
    classification: Classification

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'TYPE_ID',
        referencedColumnName: 'TYPE_ID'
    })
    type: Type

}
