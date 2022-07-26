import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { StateVDescriptor } from './vstate';
import { MetroAreaVDescriptor } from './vmetroarea';
export interface MetroAreaStateVDescriptor extends IEntityVDescriptor {
    state?: StateVDescriptor;
    metroArea?: MetroAreaVDescriptor;
}
//# sourceMappingURL=vmetroareastate.d.ts.map