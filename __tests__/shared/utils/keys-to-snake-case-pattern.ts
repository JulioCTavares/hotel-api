import { objectToSnake } from 'ts-case-convert'

export const keysToSnakeCasePattern = (object: Object): any => {
  return objectToSnake(object)
}
