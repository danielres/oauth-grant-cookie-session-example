import { NextFunction } from "express";

export default (
  req: CookieSessionInterfaces.CookieSessionRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.user) next(new Error("Unauthorized error"));
  next();
};
