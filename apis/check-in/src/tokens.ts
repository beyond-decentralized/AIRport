import {
    CONTAINER_ACCESSOR,
    lib
} from '@airport/direction-indicator';
import { IApiRegistry } from './api/ApiRegistry';
import { IApiValidator } from './api/ApiValidator';

const checkIn = lib('check-in')

export const API_REGISTRY = checkIn.token<IApiRegistry>({
    class: null,
    interface: 'IApiRegistry',
    token: 'API_REGISTRY'
})
export const API_VALIDATOR = checkIn.token<IApiValidator>({
    class: null,
    interface: 'IApiValidator',
    token: 'API_VALIDATOR'
})
API_REGISTRY.setDependencies({
    containerAccessor: CONTAINER_ACCESSOR
})
