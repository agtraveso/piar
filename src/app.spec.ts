import * as request from 'supertest'
import { app, server } from './app'

afterAll(() => server.close())

describe('App boot', () => {
  describe('http endpoints startup', () => {
    it('when I Ping then Pong', async () => {
      await request(app).get('/ping')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.text).toContain('pong')
        })
    })
  })
})
