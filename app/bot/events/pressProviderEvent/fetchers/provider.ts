import {
  informationObjectImageSchema$$,
  informationObjectListSchema$,
  providerSchema$,
  query$,
  serviceAttributeSchema$,
  serviceSchema$,
} from '../../../../__generated/fetchers'

export const FETCH_PROVIDER = query$.provider(
  providerSchema$.id
    .service(
      serviceSchema$.id.name.serviceType.attributes(serviceAttributeSchema$.name.isRequired.notice),
    )
    .informationObjects(
      informationObjectListSchema$.id.name.description.gallery(informationObjectImageSchema$$),
    ),
)
