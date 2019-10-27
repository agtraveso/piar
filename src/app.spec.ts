import * as request from 'supertest'
import app from './app'

describe('App boot', () => {
  describe('endpoints are up', () => {
    it('when I Ping then Pong', async () => {
      await request(app).get('/ping')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.text).toContain('pong')
        })
    })
    it('when incoming gitlab event is received then ok', async () => {
      await request(app).post('/gitlab/events')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.text).toContain('ok')
        })
    })
  })
})
