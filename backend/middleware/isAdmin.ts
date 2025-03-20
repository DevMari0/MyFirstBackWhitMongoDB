import { Request, Response, NextFunction } from "express";
import { checkLogin } from "./isLogin";

interface User {
  email: string;
  isAdmin: boolean;
}

declare module "express-session" {
  interface SessionData {
    user?: User;

  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  checkLogin(req, res, (err?: any) => {
    if (err) return next(err);

    if (req.session.user && req.session.user.isAdmin === true) {
      console.log("Superato checkAdmin")

      return next();
    }

    return res.status(403).json({
      error: "Accesso negato. Sono richiesti privilegi di amministratore.",
    });
  });
};