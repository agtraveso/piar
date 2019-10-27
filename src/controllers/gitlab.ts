import { Request, Response } from 'express'
import logger from '../infrastructure/logging/Logger'

export const events = (req: Request, res: Response) => {
  logger.info(req)
  res.json('ok')
}
