import { IMetroAreaState } from "@airport/ground-control";
import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from "@airport/tarmaq-entity";
import { MetroArea } from "./MetroArea";
import { State } from "./State";

@Entity()
@Table({ name: "METRO_AREA_STATES" })
export class MetroAreaState
    implements IMetroAreaState {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'STATE_ID' })
    state: State

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'METRO_AREA_ID' })
    metroArea: MetroArea

}
