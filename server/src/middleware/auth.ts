import { Request, Response, NextFunction  } from 'express'
import { verifyToken } from '../utils/jwtUtil'

export const authMiddleware = (req: Request, res: Response, next: NextFunction ) => {
  const { authorization } = req.headers

  const parts = authorization?.split(" ") || ""
  if (!(parts.length === 2))
    return res.status(401).send({ error: 'Invalid token' })
    
    const [ scheme, token ] = parts
    // regex to validate if the first part is 'Bearer'
    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ error: 'Invalid token format' })
  
  if (!token)
    return res.status(401).send({ error: 'Missing token' })
    
  try {
    const { userEmail } = verifyToken(token)

    req.userEmail = userEmail
  } catch (erorr) {
    res.status(401).json({
      message: "Invalid token"
    })
  }

  next()
}
