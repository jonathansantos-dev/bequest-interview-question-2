import { Request, Response, NextFunction  } from 'express'
import { verifyToken } from '../utils/jwtUtil'

export const authMiddleware = (req: Request, res: Response, next: NextFunction ) => {
  const { authorization } = req.headers

  const parts = authorization?.split(" ") || ""
  if (!(parts.length === 2))
    return res.status(401).send({ error: 'Invalid token' })
    
    const [ scheme, token ] = parts
    // regex que valida se a primeira palavra é 'Bearer'
    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ error: 'Invalid token format' })
  
  if (!token)
    return res.status(401).send({ error: 'Missing token' })
    
  try {
    verifyToken(token)
    res.status(200).json({
      message: "Authenticated"
    })
  } catch (erorr) {
    res.status(401).json({
      message: "Invalid token"
    })
  }

  next()
}
