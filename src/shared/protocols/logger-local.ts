export interface ILoggerLocal {
  child(bindings: { [key: string]: string }): any
  logInfo(message: any): void
  logDebug(message: any): void
  logError(message: any): void
}
