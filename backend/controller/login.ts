import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Cookie, SessionData } from "express-session";
import { LoginInfo } from "../type/infoSchema";
import { ErrorCodes } from "../constants/errorCodes";
import { responseStatus } from "../constants/status";
import Users from "../models/userSchema";
import { AppSuccess } from "../type/succesType";
import { SessionManager } from "../sessiondata";
import { AppError } from "../type/errorType";



const login = async (
  request: Request<undefined, unknown, LoginInfo>,
  response: Response
) => {
  try {
    const { body } = request;
    console.log("dati di login:", body);

    if (!body.email || !body.password) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.MISSING_FIELD,
        "Email e password sono richiesti"
      );
    }

    const user = await Users.findOne({ email: body.email });
    console.log("dati users", user);

    if (!user) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_CREDENTIALS,
        "Credenziali non valide"
      );
    }

    const isCorrect = await bcrypt.compare(body.password, user.password);
    console.log("Password corretta:", isCorrect);
    if (!isCorrect) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_CREDENTIALS,
        "Credenziali non valide"
      );
    }

    const sessionManager = SessionManager.getInstance();
    
    request.session.user = {
      email: user.email,
      isAdmin: user.isAdmin!,
    };

    
    console.log("Sessione creata:", request.session);

    // Crea la sessione
    const sessionData: SessionData = {
      email: user.email!,
      name: user.name,
      isAdmin: user.isAdmin!,
      cookie: new Cookie(),
    
    };

    sessionManager.createSession(sessionData);

    AppSuccess.getInstance().successResponse(
      response,
      "LOGIN_SUCCESS",
      responseStatus.OK,
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }
    );

    return;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("Errore durante il login:", error);
    throw new AppError(
      responseStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.INVALID_CREDENTIALS,
      "Errore durante il login"
    );
  }
};

export default login;