import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { RegisterInfo } from '../type/infoSchema';
import { RegisterInfoSchema } from '../type/schemazod';
import Users from '../models/userSchema';




export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body)
    const body : RegisterInfo = req.body;

    const verifiedBody = RegisterInfoSchema.safeParse(body);

    if (verifiedBody.success === false) {
      throw new Error('Validazione del body fallita: '+ JSON.stringify(verifiedBody.error));
    }

    const passwordHash = await bcrypt.hash(verifiedBody.data.password, 12);



    const existingUser = await Users.findOne({ email: verifiedBody.data.email });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'Un utente con questa email esiste già'
      });
      return;
    }

    const newUser = await Users.create({   
        name : verifiedBody.data.name,
        email : verifiedBody.data.email,
        password: passwordHash,
        isAdmin:  false,
    });


    res.status(201).json({
      success: true,
      message: 'Utente registrato con successo',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      }
    });


  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Errore durante la registrazione',
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Errore interno del server durante la registrazione'
      });
    }
  }
};

export default register