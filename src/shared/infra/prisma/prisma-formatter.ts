export class PrismaFormatter {
  static formatFilter(filterObject: any): Object {
    const filterEntries = Object.entries(filterObject)

    const enumTypes: string[] = []
    const filterdByDate = ['createdAt', 'updatedAt', 'birthDate']

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

        if (typeof value === 'string' && key !== 'id') {
          return [key, { contains: value, mode: 'insensitive' }]
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
      ([_key, value]) => value !== undefined || value !== null,
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
