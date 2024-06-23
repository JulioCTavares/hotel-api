type required = boolean

export class SwaggerTypes {
  static string(required: required = false, example: string = 'Teste') {
    return {
      type: 'string',
      required,
      example,
    }
  }

  static email(required: required = false, example: string = 'abc@email.com') {
    return {
      type: 'string',
      format: 'email',
      required,
      example,
    }
  }

  static uuid(
    required: required = false,
    example: string = 'b2b7dcd6-6032-4973-b49e-8926535bcfb4',
  ) {
    return {
      type: 'string',
      format: 'uuid',
      required,
      example,
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

  static boolean(required: required = false, example: boolean = true) {
    return {
      type: 'boolean',
      required,
      example,
    }
  }

  static integer(required: required = false, example: number = 10) {
    return {
      type: 'integer',
      required,
      example,
    }
  }

  static array(required: required = false, type: any, maxItems: number) {
    return {
      type: 'array',
      items: {
        ...type,
        maxItems,
      },
    }
  }

  static object(required: required = false, properties: any) {
    return {
      type: 'object',
      properties: Object.fromEntries(properties),
    }
  }
}
