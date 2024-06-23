type required = boolean

export class SwaggerTypes {
  static string(required: required = false) {
    return {
      type: 'string',
      required,
    }
  }

  static email(required: required = false) {
    return {
      type: 'string',
      format: 'email',
      required,
    }
  }

  static enum(possibleValues: string[], required: boolean = false) {
    return {
      type: 'string',
      required,
      enum: possibleValues,
    }
  }

  static uuid(required: required = false) {
    return {
      type: 'string',
      format: 'uuid',
      required,
    }
  }

  static password(required: required = false) {
    return {
      type: 'string',
      format: 'password',
      required,
    }
  }

  static dateTime(
    required: required = false,
    example: string = '2022-07-08T03:00:00Z',
  ) {
    return {
      type: 'string',
      format: 'date-time',
      required,
      example,
    }
  }

  static boolean(required: required = false) {
    return {
      type: 'boolean',
      required,
    }
  }

  static integer(required: required = false, example: number = 10) {
    return {
      type: 'integer',
      required,
      example,
    }
  }

  static array(_required: required = false, type: any, maxItems: number) {
    return {
      type: 'array',
      items: {
        ...type,
        maxItems,
      },
    }
  }

  static object(_required: required = false, properties: any) {
    return {
      type: 'object',
      properties: Object.fromEntries(properties),
    }
  }
}
