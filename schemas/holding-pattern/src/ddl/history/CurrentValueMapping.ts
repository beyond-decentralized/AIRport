import { Entity, Id, JoinColumns, ManyToOne, Table } from '@airport/tarmaq-entity'
import { RecordHistoryNewValue } from './RecordHistoryNewValue';
import { ICurrentValueMapping } from '@airport/ground-control';

@Entity()
@Table({ name: "CURRENT_VALUE_MAPPINGS" })
export class CurrentValueMapping
    implements ICurrentValueMapping {

    @Id()
    @ManyToOne()
    @JoinColumns([{
        name: "REPOSITORY_RECORD_HISTORY_LID", nullable: false
    }, {
        name: "COLUMN_INDEX", nullable: false
    }])
    value: RecordHistoryNewValue

}