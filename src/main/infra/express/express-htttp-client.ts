import http from 'http'
import app from './config/app'

export const expressHttpServer = http.createServer(app)
