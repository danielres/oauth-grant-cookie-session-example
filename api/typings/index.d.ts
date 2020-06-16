import { NextFunction } from "express";

export type Middleware = (
  req: CookieSessionRequest,
  res: Response,
  next: NextFunction
) => void;
