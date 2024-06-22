export interface Validation {
  validate: (input: Validation.Params) => Validation.Result
}

export namespace Validation {
  export type Params = any
  export type Result = Error | void
}
