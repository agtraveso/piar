import { Request, Response } from 'express'
import { gitIncomingEventProcessor } from '../infrastructure/boot'

export const events = (req: Request, res: Response) => {
  gitIncomingEventProcessor.process(req)
  res.json('ok')
}
