const booleanConverter = (value: string) => {
  if (value === 'true') return true
  if (value === 'false') return false

  return value
}

const arrayConverter = (value: string) => {
  if (typeof value === 'string' && value !== '') return [...value.split(',')]
  return value
}

const numberConverter = (value: string) => parseInt(value)

const rangeDateConverter = (value: string) => {
  const rangeDateArray = arrayConverter(value)

  const [initialDate, finalDate] = rangeDateArray

  const rangeDateObject = { initialDate, finalDate }

  return rangeDateObject
}

const orderByConverter = (value: string) => {
  const orderByArray = arrayConverter(value)

  const [property, mode] = orderByArray

  const orderByObject = { property, mode }

  return orderByObject
}

const propertysInQueryToConvert = {
  is_admin: booleanConverter,
  enabled: booleanConverter,
  take: numberConverter,
  skip: numberConverter,
  created_at: rangeDateConverter,
  updated_at: rangeDateConverter,
  order_by: orderByConverter,
  count: booleanConverter,
}

export const convertProperties = (obj: any): any =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => {
        // @ts-expect-error
        if (propertysInQueryToConvert[key])
          // @ts-expect-error
          return [key, propertysInQueryToConvert[key](value)]
        return [key, value]
      }),
  )
