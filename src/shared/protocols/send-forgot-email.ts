export interface ISendForgotPasswordEmail {
  send(params: ISendForgotPasswordEmail.Params): Promise<void>
}

export namespace ISendForgotPasswordEmail {
  export type Params = { email: string }
}
