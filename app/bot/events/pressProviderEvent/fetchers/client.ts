import { clientSchema$, query$ } from '../../../../__generated/fetchers'

export const FETCH_CLIENT = query$.client(clientSchema$.id)
