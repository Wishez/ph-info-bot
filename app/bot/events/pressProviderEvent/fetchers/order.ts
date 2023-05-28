import {
  filledServiceAttributeListSchema$,
  informationObjectListSchema$,
  orderSchema$,
  query$,
  serviceAttributeSchema$,
  serviceSchema$,
} from '../../../../__generated/fetchers'

export const FETCH_ORDER = query$.order(
  orderSchema$.id.chatId.status
    .service(serviceSchema$.serviceType)
    .informationObject(informationObjectListSchema$.name)
    .filledServicesAttributes(
      filledServiceAttributeListSchema$.id.value.serviceAttribute(
        serviceAttributeSchema$.id.isRequired.notice.name.options,
      ),
    ),
)
