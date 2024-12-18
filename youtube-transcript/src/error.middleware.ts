import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    // console.error(err);
    res.status(500).send("Internal server error");
  }
  next();
};
