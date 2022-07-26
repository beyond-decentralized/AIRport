import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { StateVDescriptor } from './vstate';
import { State } from '../../ddl/locality/State';
import { MetroAreaVDescriptor } from './vmetroarea';
import { MetroArea } from '../../ddl/locality/MetroArea';
export interface MetroAreaStateVDescriptor<T> extends IEntityVDescriptor<T> {
    state?: StateVDescriptor<State>;
    metroArea?: MetroAreaVDescriptor<MetroArea>;
}
//# sourceMappingURL=vmetroareastate.d.ts.map