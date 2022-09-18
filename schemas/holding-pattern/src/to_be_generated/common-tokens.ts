import { lib } from '@airport/direction-indicator'

export const holdingPattern = lib('@airport/holding-pattern')

export const REPOSITORY_API = holdingPattern.token<any>({
    class: null,
    interface: 'RepositoryApi',
    token: 'REPOSITORY_API'
})
