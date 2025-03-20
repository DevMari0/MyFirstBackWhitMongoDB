import { Request, Response } from "express";
import Products from "../models/productSchema";




export const changeQuantity = async (req: Request, res: Response) => {
    const { id } = req.params; // gestito con QParams
    const { quantity } = req.body;
  
    if (typeof quantity !== 'number' || quantity < 0) {
      return res.status(400).json({ message: 'La quantità deve essere un numero maggiore o uguale a 0.' });
    }
  
    try {
      const updatedProduct = await Products.findByIdAndUpdate(
        id,
        { quantity },
        { new: true } // per avere doc aggiornato
      ).select('name quantity -_id'); // escude id
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Prodotto non trovato.' });
      }
  
      res.status(200).json({
        message: 'Quantità aggiornata con successo.',
        product: updatedProduct
      });
    } catch (error) {
      console.error('Errore durante l\'aggiornamento della quantità:', error);
      res.status(500).json({ message: 'Errore del server.' });
    }
  };