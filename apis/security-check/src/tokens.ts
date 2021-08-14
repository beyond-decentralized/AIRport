import { system } from '@airport/di';
import { IApiRegistry } from './api/ApiRegistry';
import { IApiValidator } from './api/ApiValidator';

const securityCheck = system('airport').lib('security-check')

export const API_REGISTRY = securityCheck.token<IApiRegistry>('IApiRegistry')
export const API_VALIDATOR = securityCheck.token<IApiValidator>('IApiValidator')
