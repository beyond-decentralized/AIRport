import {
    ContainerAccessor,
    lib
} from '@airport/direction-indicator';
import { IApiRegistry } from './api/ApiRegistry';
import { IApiValidator } from './api/ApiValidator';

const checkIn = lib('check-in')

export const API_REGISTRY = checkIn.token<IApiRegistry>('ApiRegistry')
export const API_VALIDATOR = checkIn.token<IApiValidator>('ApiValidator')

API_REGISTRY.setDependencies({
    containerAccessor: ContainerAccessor
})
