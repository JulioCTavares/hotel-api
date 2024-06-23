export class PrismaFormatter {
  static formatFilter(filterObject: any): Object {
    const filterEntries = Object.entries(filterObject)

    const enumTypes: string[] = []
    const filterdByDate = [
      'createdAt',
      'updatedAt',
      'birthDate',
      'bookingDate',
      'startDate',
      'endDate',
    ]

    const filterNumeric = [
      'roomNumber', // Adicione aqui outros campos que deveriam ser numéricos
    ]

    const filterWithouUndefined = filterEntries.filter(
      ([_key, value]) => value !== undefined,
    )

    const filterEntriesTransformed = filterWithouUndefined.map(
      ([key, value]) => {
        if (enumTypes.includes(key)) {
          if (Array.isArray(value)) {
            return [key, { in: value }]
          }
          return [key, value]
        }

        if (key.endsWith('Id')) {
          return [key, value]
        }

        if (filterNumeric.includes(key)) {
          const numValue = Number(value)
          if (!isNaN(numValue)) {
            return [key, numValue]
          }
          return [null, null]
        }

        if (typeof value === 'string' && key !== 'id') {
          return [key, { contains: value }]
        }

        if (filterdByDate.includes(key)) {
          // @ts-expect-error
          const { initialDate, finalDate } = value

          if (initialDate === undefined && finalDate === undefined) {
            return [null, null]
          }

          if (finalDate === undefined) {
            return [key, { gte: new Date(initialDate) }]
          }

          if (initialDate === undefined) {
            return [key, { lte: new Date(finalDate) }]
          }

          return [key, { gte: new Date(initialDate), lte: new Date(finalDate) }]
        }

        return [key, value]
      },
    )

    const filterEntriesTransformedWithouNulls = filterEntriesTransformed.filter(
      ([_key, value]) => value !== undefined && value !== null,
    )

    const filterObjectFormated = Object.fromEntries(
      filterEntriesTransformedWithouNulls,
    )

    return filterObjectFormated
  }

  static formatFindOptions(findOptions: {
    take: number | undefined
    skip: number | undefined
    orderBy:
    | {
      property: string
      mode: 'asc' | 'desc'
    }
    | undefined
  }) {
    const { take, skip, orderBy } = findOptions

    const findOptionsObject = {
      ...(take !== undefined ? { take } : {}),
      ...(skip !== undefined ? { skip } : {}),
      orderBy:
        orderBy?.property !== undefined && orderBy?.mode !== undefined
          ? { [orderBy.property]: orderBy.mode }
          : { createdAt: 'desc' },
    }

    return findOptionsObject
  }
}
