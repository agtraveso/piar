import { Request, Response } from 'express'
import { gitlabEventReader } from '../infrastructure/events/incoming/gitlabEventReader'


export const events = (req: Request, res: Response) => {
  gitlabEventReader.read(req)
  res.json('ok')
}
