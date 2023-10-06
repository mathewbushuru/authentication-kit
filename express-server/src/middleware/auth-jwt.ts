import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    const errorMessage = "No token provided";
    return res.status(403).json({ errorMessage });
  }

  const jwtTokenReceived = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      jwtTokenReceived,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;
    console.log(decodedToken);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    const errorMessage = "Unauthorized - Wrong JWT token";
    console.log(errorMessage);
    return res.status(401).json({ errorMessage, error });
  }
}
