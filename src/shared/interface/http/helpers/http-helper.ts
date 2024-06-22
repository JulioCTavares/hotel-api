import { HttpResponse } from '@/shared/interface/http/protocols'
import { HttpStatus } from './http-status-helper'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: error,
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: HttpStatus.NOT_FOUND,
  body: error,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  body: error,
})

export const created = (data: any): HttpResponse => ({
  statusCode: HttpStatus.CREATED,
  body: data,
})

export const ok = (data?: any): HttpResponse => {
  return {
    statusCode: HttpStatus.OK,
    body: data,
  }
}

export const conflict = (error: any): HttpResponse => ({
  statusCode: HttpStatus.CONFLICT,
  body: error,
})

export const updated = (data?: any): HttpResponse => ({
  statusCode: HttpStatus.OK,
  body: data,
})

export const forbidden = (data?: any): HttpResponse => ({
  statusCode: HttpStatus.FORBIDDEN,
  body: data,
})

export const unauthorized = (data?: any): HttpResponse => ({
  statusCode: HttpStatus.UNAUTHORIZED,
  body: data,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
})
