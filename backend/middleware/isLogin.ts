import { NextFunction, Request, Response} from 'express'

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  let isLoggedIn = false;

  if (req.session.user?.email !== undefined) { 
    isLoggedIn = true;
  }

  if (!isLoggedIn) {
    res.status(401).json('User must be logged in to access this resource');
    return;
  }
  console.log("Superato Checklogin")
  next();
}