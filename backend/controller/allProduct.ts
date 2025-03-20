import Products from "../models/productSchema";
import { Request, Response } from "express";


export const getPublicProducts = async (req: Request, res: Response) => {
    try {
      const products = await Products.find({})
        .select('name quantity') 
        .lean();
  
      const formattedProducts = products.map(product => ({
        name: product.name,
        disponibilità: product.quantity > 0 ? "Disponibile" : "Non disponibile"
      }));
  
      res.status(200).json(formattedProducts);
    } catch (error) {
      console.error('Error fetching public products:', error);
      res.status(500).json({ message: 'Errore del server' });
    }
  };
  